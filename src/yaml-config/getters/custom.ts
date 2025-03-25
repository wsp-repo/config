import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение кастомного конфига
 */
export function getYamlCustom<T>(path: string, options?: YamlReqOptions<T>): T;
export function getYamlCustom<T>(
  path: string,
  options?: YamlBaseOptions<T>,
): T | undefined;
export function getYamlCustom<T>(
  jsonPath: string,
  options?: YamlOptions<T>,
): T | undefined {
  return getYamlValue<T>(jsonPath, options);
}
