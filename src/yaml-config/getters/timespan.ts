import { Timespan } from '@zalib/core';

import { timespanSchema } from '../../schemas';
import { getYamlValue } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Возвращает значение Timespan конфига
 */
export function getYamlTimespan(
  path: string,
  options?: ReqOptions<string>,
): Timespan;
export function getYamlTimespan(
  path: string,
  options?: BaseOptions<string>,
): Timespan | undefined;
export function getYamlTimespan(
  jsonPath: string,
  options?: Options<string>,
): Timespan | undefined {
  const value = getYamlValue<string | number>(jsonPath, {
    schema: timespanSchema,
    ...options,
  });

  return value ? new Timespan(value) : undefined;
}
