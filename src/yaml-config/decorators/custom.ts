/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlCustom } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlCustom<T>(
  path: string,
  options?: ReqOptions<T>,
): PropertyDecorator;
export function YamlCustom<T>(
  path: string,
  options?: BaseOptions<T>,
): PropertyDecorator;
export function YamlCustom<T>(
  jsonPath: string,
  options?: Options<T>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlCustom<T>(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
