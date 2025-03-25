/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlCustom } from '../getters';
import { throwSetter } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlCustom<T>(
  path: string,
  options?: YamlReqOptions<T>,
): PropertyDecorator;
export function YamlCustom<T>(
  path: string,
  options?: YamlBaseOptions<T>,
): PropertyDecorator;
export function YamlCustom<T>(
  jsonPath: string,
  options?: YamlOptions<T>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlCustom<T>(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
