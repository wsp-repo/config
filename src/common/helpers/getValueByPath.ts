import { get as getValue } from 'lodash';

import { throwError } from './throwError';

/**
 * Считывает данные из объекта по JsonPath
 */
export function getValueByPath<T>(
  json: unknown,
  path: string,
): Partial<T> | undefined {
  try {
    return getValue(json, path);
  } catch (error) {
    const { message } = error as Error;

    throwError(`Error read path ${path}`, [message]);
  }
}
