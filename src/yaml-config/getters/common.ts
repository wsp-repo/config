/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isDefined, isUndefined } from '@zalib/core';

import {
  getValueByPath,
  mergeConfigs,
  safeValidate,
  throwError,
} from '../../common/helpers';
import { getConfigObjects } from '../helpers/loader';

import { BaseOptions, NoValid, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение из конфига в соответствии с опциями
 */
export function getYamlValue<T>(path: string, options?: ReqOptions<T>): T;
export function getYamlValue<T>(
  path: string,
  options?: BaseOptions<T>,
): T | undefined;
export function getYamlValue<T>(
  path: string,
  options?: Options<T>,
): T | undefined {
  const {
    mergeArray,
    schema,
    required,
    defValue,
    noValid = NoValid.Error,
  } = options || {};

  // проверка дефолтного значения на предмет его корректности
  const { errors: defErrors, value: validatedDef } =
    schema && isDefined(defValue)
      ? safeValidate(defValue, schema, path)
      : { value: defValue };

  if (isDefined(defValue) && isUndefined(validatedDef)) {
    throwError(`Error def validate '${path}'`, defErrors);
  }

  const pathConfigs: Partial<T>[] = getConfigObjects().reduce(
    (memo, config) => {
      const data = getValueByPath<T>(config, path);

      if (isDefined(data)) memo.push(data);

      return memo;
    },
    [],
  );

  const mergedValue = mergeConfigs(pathConfigs, mergeArray);

  const { errors: mergedErrors, value: validatedValue } = schema
    ? safeValidate(mergedValue, schema, path)
    : { value: mergedValue };

  if (isDefined(validatedValue)) return validatedValue;

  if (isDefined(defValue) && noValid === NoValid.Default) {
    return defValue;
  }

  if (isUndefined(mergedValue) && required) {
    throwError(`Not exists path '${path}'`);
  }

  const useError = isDefined(mergedValue) && noValid === NoValid.Error;

  if (isUndefined(validatedValue) && (required || useError)) {
    throwError(`Error validate '${path}'`, mergedErrors);
  }
}
