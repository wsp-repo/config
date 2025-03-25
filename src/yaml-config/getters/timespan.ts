import { Timespan } from '@zalib/core';

import { timespanSchema } from '../schemas';
import { getYamlValue } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Возвращает значение Timespan конфига
 */
export function getYamlTimespan(
  path: string,
  options?: YamlReqOptions<string>,
): Timespan;
export function getYamlTimespan(
  path: string,
  options?: YamlBaseOptions<string>,
): Timespan | undefined;
export function getYamlTimespan(
  jsonPath: string,
  options?: YamlOptions<string>,
): Timespan | undefined {
  const value = getYamlValue<string | number>(jsonPath, {
    schema: timespanSchema,
    ...options,
  });

  return value ? new Timespan(value) : undefined;
}
