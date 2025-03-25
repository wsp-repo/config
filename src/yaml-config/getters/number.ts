import { numberSchema } from '../schemas';
import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение числового конфига
 */
export function getYamlNumber(
  path: string,
  options?: YamlReqOptions<number>,
): number;
export function getYamlNumber(
  path: string,
  options?: YamlBaseOptions<number>,
): number | undefined;
export function getYamlNumber(
  jsonPath: string,
  options?: YamlOptions<number>,
): number | undefined {
  return getYamlValue<number>(jsonPath, {
    schema: numberSchema,
    ...options,
  });
}
