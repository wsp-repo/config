/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlTimespan } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlTimespan(
  path: string,
  options?: ReqOptions<string>,
): PropertyDecorator;
export function YamlTimespan(
  path: string,
  options?: BaseOptions<string>,
): PropertyDecorator;
export function YamlTimespan(
  jsonPath: string,
  options?: Options<string>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlTimespan(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
