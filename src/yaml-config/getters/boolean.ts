import { booleanSchema } from '../schemas';
import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение булева конфига
 */
export function getYamlBoolean(
  path: string,
  options?: YamlReqOptions<boolean>,
): boolean;
export function getYamlBoolean(
  path: string,
  options?: YamlBaseOptions<boolean>,
): boolean | undefined;
export function getYamlBoolean(
  jsonPath: string,
  options?: YamlOptions<boolean>,
): boolean | undefined {
  return getYamlValue<boolean>(jsonPath, {
    schema: booleanSchema,
    ...options,
  });
}
