/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlNumber } from '../getters';
import { throwSetter } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlNumber(
  path: string,
  options?: YamlReqOptions<number>,
): PropertyDecorator;
export function YamlNumber(
  path: string,
  options?: YamlBaseOptions<number>,
): PropertyDecorator;
export function YamlNumber(
  jsonPath: string,
  options?: YamlOptions<number>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlNumber(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
