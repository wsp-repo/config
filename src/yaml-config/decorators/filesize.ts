/* eslint-disable @typescript-eslint/naming-convention */
import { getYamlFileSize } from '../getters';
import { throwSetter } from './common';

import { YamlBaseOptions, YamlOptions, YamlReqOptions } from '../types';

/**
 * Декоратор для чтения конфига
 */
export function YamlFileSize(
  path: string,
  options?: YamlReqOptions<string>,
): PropertyDecorator;
export function YamlFileSize(
  path: string,
  options?: YamlBaseOptions<string>,
): PropertyDecorator;
export function YamlFileSize(
  jsonPath: string,
  options?: YamlOptions<string>,
): PropertyDecorator {
  return (target: object, propertyKey: string | symbol): void => {
    const propValue = getYamlFileSize(jsonPath, options);

    const attr = { get: () => propValue, set: throwSetter };

    Object.defineProperty(target, propertyKey, attr);
  };
}
