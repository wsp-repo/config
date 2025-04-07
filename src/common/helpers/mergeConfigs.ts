/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { deepMerge, MergeArray, MergeCustom } from '@zalib/core';

/**
 * Выполняет мерж нескольких конфигов или их частей
 */
export function mergeConfigs(
  configs: any[],
  mergeArray: MergeArray | MergeCustom = MergeArray.Replace,
): any {
  const result: any = {};
  const opts = { mergeArray };

  for (const config of configs) {
    deepMerge(result, { value: config }, opts);
  }

  return result.value;
}
