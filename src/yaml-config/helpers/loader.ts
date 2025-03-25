/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFileSync } from 'fs';
import { parse as parseYaml } from 'yaml';

import { defYamlFiles } from './files';

const configObjects: any = [];

/**
 * Очищает массив объектов конфигов
 */
function cleanConfigObjects(): void {
  configObjects.length = 0;
}

/**
 * Возвращает массив объектов из конфигов
 */
export function getConfigObjects(): any[] {
  return configObjects;
}

export function initYamlConfig(path?: string): void;
export function initYamlConfig(files?: string[]): void;
export function initYamlConfig(pathOrFiles?: string | string[]): void {
  const files = Array.isArray(pathOrFiles)
    ? pathOrFiles
    : defYamlFiles(pathOrFiles);

  cleanConfigObjects();

  files.forEach((file) => {
    try {
      const data = readFileSync(file, { encoding: 'utf-8' });

      configObjects.push(parseYaml(data));
    } catch (error) {
      console.warn(`Error parse file '${file}'`, {
        info: (error as Error).message,
      });

      cleanConfigObjects();

      throw error;
    }
  });
}
