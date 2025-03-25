/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ajvErrors, ajvFactory, AjvSchema } from '@zalib/ajv';
import { isDefined, isUndefined } from '@zalib/core';
import deepmerge from 'deepmerge';
import { JSONPath } from 'jsonpath-plus';

import { getConfigObjects } from '../helpers/loader';

import {
  YamlBaseOptions,
  YamlMerge,
  YamlNoValid,
  YamlOptions,
  YamlReqOptions,
} from '../types';

// поиск вхождений: "..", "[X::]", "[::X]"
const regArray = /(\.\.)|(\[[^\]]*?[^\]\d][^\]]*?\])/;

const ajvValidator = ajvFactory();

const logger = console;

/**
 * Вызывает исключение с фиксацией ошибки
 */
function throwError(message: string, data?: unknown): never {
  logger.error(message, data);

  throw new Error(message);
}

/**
 * Считывает данные из объекта по JsonPath
 */
function getJsonPath<T>(json: any, path: string): Partial<T> | undefined {
  try {
    const result = JSONPath({ json, path });

    return path.match(regArray) ? result : result[0];
  } catch (error) {
    const { message } = error as Error;

    throwError(message, { error });
  }
}

/**
 * Безопасно валидирует объект, если есть схема валидации
 */
function safeValidate<T>(
  value: any,
  schema: AjvSchema<T>,
  path: string,
): T | undefined {
  if (ajvValidator.validate(schema, value)) {
    return value;
  }

  const errors = ajvErrors(ajvValidator);

  logger.warn(errors, { path });
}

/**
 * Выполняет слияние массива "добалением"
 */
function mergeAppend(target: any[], source: any[]): any[] {
  return [...target, ...source];
}

/**
 * Выполняет слияние массива "полной заменой"
 */
function mergeOverwrite(_target: any[], source: any[]): any[] {
  return source;
}

/**
 * Выполняет слияние массива "комбинаторикой"
 */
function mergeCombine(target: any[], source: any[], options: any): any[] {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });

  return destination;
}

const mergeMethods = {
  [YamlMerge.Append]: mergeAppend,
  [YamlMerge.Combine]: mergeCombine,
  [YamlMerge.Overwrite]: mergeOverwrite,
};

const defaultMergeMethod = mergeOverwrite;

/**
 * Возвращает значение из конфига в соответствии с опциями
 */
export function getYamlValue<T>(path: string, options?: YamlReqOptions<T>): T;
export function getYamlValue<T>(
  path: string,
  options?: YamlBaseOptions<T>,
): T | undefined;
export function getYamlValue<T>(
  path: string,
  options?: YamlOptions<T>,
): T | undefined {
  const {
    arrayMerge = YamlMerge.Overwrite,
    schema,
    required,
    defValue,
    noValid = YamlNoValid.Error,
  } = options || {};

  // проверка дефолтного значения на предмет его корректности
  const validatedDef =
    schema && isDefined(defValue)
      ? safeValidate(defValue, schema, path)
      : defValue;

  if (isDefined(defValue) && isUndefined(validatedDef)) {
    throwError(`Def value '${path}' not valid`);
  }

  const pathConfigs: Partial<T>[] = getConfigObjects().reduce(
    (memo, config) => {
      const data = getJsonPath<T>(config, path);

      // { value: data } нужно для мержа ниже
      if (data) memo.push({ value: data });

      return memo;
    },
    [],
  );

  const mergeMethod =
    arrayMerge && mergeMethods[arrayMerge]
      ? mergeMethods[arrayMerge]
      : defaultMergeMethod;

  const { value: mergedValue } = deepmerge.all<{ value: T }>(pathConfigs, {
    arrayMerge: mergeMethod,
    clone: true,
  });

  const validatedValue = schema
    ? safeValidate(mergedValue, schema, path)
    : mergedValue;

  if (isDefined(validatedValue)) return validatedValue;

  if (isDefined(defValue) && noValid === YamlNoValid.Default) {
    return defValue;
  }

  if (isUndefined(mergedValue) && required) {
    throwError(`Not exists path '${path}'`);
  }

  const useError = isDefined(mergedValue) && noValid === YamlNoValid.Error;

  if (isUndefined(validatedValue) && (required || useError)) {
    throwError(`Not valid value '${path}'`);
  }
}
