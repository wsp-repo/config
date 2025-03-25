import { FileSize } from '@zalib/core';

import { fileSizeSchema } from '../schemas';
import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение Size конфига
 */
export function getYamlFileSize(
  path: string,
  options?: YamlReqOptions<string>,
): FileSize;
export function getYamlFileSize(
  path: string,
  options?: YamlBaseOptions<string>,
): FileSize | undefined;
export function getYamlFileSize(
  jsonPath: string,
  options?: YamlOptions<string>,
): FileSize | undefined {
  const value = getYamlValue<string | number>(jsonPath, {
    schema: fileSizeSchema,
    ...options,
  });

  return value ? new FileSize(value) : undefined;
}
