import { stringSchema } from '../schemas';
import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение строкового конфига
 */
export function getYamlString(
  path: string,
  options?: YamlReqOptions<string>,
): string;
export function getYamlString(
  path: string,
  options?: YamlBaseOptions<string>,
): string | undefined;
export function getYamlString(
  jsonPath: string,
  options?: YamlOptions<string>,
): string | undefined {
  return getYamlValue<string>(jsonPath, {
    schema: stringSchema,
    ...options,
  });
}
