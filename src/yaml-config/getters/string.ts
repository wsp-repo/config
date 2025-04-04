import { stringSchema } from '../../schemas';
import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение строкового конфига
 */
export function getYamlString(
  path: string,
  options?: ReqOptions<string>,
): string;
export function getYamlString(
  path: string,
  options?: BaseOptions<string>,
): string | undefined;
export function getYamlString(
  jsonPath: string,
  options?: Options<string>,
): string | undefined {
  return getYamlValue<string>(jsonPath, {
    schema: stringSchema,
    ...options,
  });
}
