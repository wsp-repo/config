/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlString } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlString(
  path: string,
  options?: ReqOptions<string>,
): PropertyDecorator;
export function YamlString(
  path: string,
  options?: BaseOptions<string>,
): PropertyDecorator;
export function YamlString(
  jsonPath: string,
  options?: Options<string>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlString(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
