import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение кастомного конфига
 */
export function getYamlCustom<T>(path: string, options?: ReqOptions<T>): T;
export function getYamlCustom<T>(
  path: string,
  options?: BaseOptions<T>,
): T | undefined;
export function getYamlCustom<T>(
  jsonPath: string,
  options?: Options<T>,
): T | undefined {
  return getYamlValue<T>(jsonPath, options);
}
