/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlBoolean } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlBoolean(
  path: string,
  options?: ReqOptions<boolean>,
): PropertyDecorator;
export function YamlBoolean(
  path: string,
  options?: BaseOptions<boolean>,
): PropertyDecorator;
export function YamlBoolean(
  jsonPath: string,
  options?: Options<boolean>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlBoolean(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
