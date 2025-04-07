import { booleanSchema } from '../../schemas';
import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение булева конфига
 */
export function getYamlBoolean(
  path: string,
  options?: ReqOptions<boolean>,
): boolean;
export function getYamlBoolean(
  path: string,
  options?: BaseOptions<boolean>,
): boolean | undefined;
export function getYamlBoolean(
  jsonPath: string,
  options?: Options<boolean>,
): boolean | undefined {
  return getYamlValue<boolean>(jsonPath, {
    schema: booleanSchema,
    ...options,
  });
}
