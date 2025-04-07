/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlNumber } from '../getters';
import { throwSetter } from './common';

import { BaseOptions, Options, ReqOptions } from '../../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlNumber(
  path: string,
  options?: ReqOptions<number>,
): PropertyDecorator;
export function YamlNumber(
  path: string,
  options?: BaseOptions<number>,
): PropertyDecorator;
export function YamlNumber(
  jsonPath: string,
  options?: Options<number>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlNumber(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
