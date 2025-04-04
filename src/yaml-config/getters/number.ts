import { numberSchema } from '../../schemas';
import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение числового конфига
 */
export function getYamlNumber(
  path: string,
  options?: ReqOptions<number>,
): number;
export function getYamlNumber(
  path: string,
  options?: BaseOptions<number>,
): number | undefined;
export function getYamlNumber(
  jsonPath: string,
  options?: Options<number>,
): number | undefined {
  return getYamlValue<number>(jsonPath, {
    schema: numberSchema,
    ...options,
  });
}
