import { FileSize } from '@zalib/core';

import { fileSizeSchema } from '../../schemas';
import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение Size конфига
 */
export function getYamlFileSize(
  path: string,
  options?: ReqOptions<string>,
): FileSize;
export function getYamlFileSize(
  path: string,
  options?: BaseOptions<string>,
): FileSize | undefined;
export function getYamlFileSize(
  jsonPath: string,
  options?: Options<string>,
): FileSize | undefined {
  const value = getYamlValue<string | number>(jsonPath, {
    schema: fileSizeSchema,
    ...options,
  });

  return value ? new FileSize(value) : undefined;
}
