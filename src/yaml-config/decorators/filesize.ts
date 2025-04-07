/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlFileSize } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlFileSize(
  path: string,
  options?: ReqOptions<string>,
): PropertyDecorator;
export function YamlFileSize(
  path: string,
  options?: BaseOptions<string>,
): PropertyDecorator;
export function YamlFileSize(
  jsonPath: string,
  options?: Options<string>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlFileSize(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
