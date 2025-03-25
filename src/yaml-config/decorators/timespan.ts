/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlTimespan } from '../getters';
import { throwSetter } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlTimespan(
  path: string,
  options?: YamlReqOptions<string>,
): PropertyDecorator;
export function YamlTimespan(
  path: string,
  options?: YamlBaseOptions<string>,
): PropertyDecorator;
export function YamlTimespan(
  jsonPath: string,
  options?: YamlOptions<string>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlTimespan(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
