/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFileSync } from 'fs';
import { parse as parseYaml } from 'yaml';

// import { createLogger } from '../../logger';
import { getYamlFiles } from './files';

// export const logger = createLogger('YamlConfig');

const configObjects: any = [];

/**
 * Возвращает массив объектов из конфигов
 */
export function getConfigObjects(): any[] {
  return configObjects;
}

export function loadYamlFiles(path?: string): void;
export function loadYamlFiles(files?: string[]): void;
export function loadYamlFiles(pathOrFiles?: string | string[]): void {
  const files = Array.isArray(pathOrFiles)
    ? pathOrFiles
    : getYamlFiles(pathOrFiles);

  files.reduce((memo, file) => {
    try {
      const data = readFileSync(file, { encoding: 'utf-8' });

      memo.push(parseYaml(data));
    } catch (error) {
      console.warn(`Error parse file '${file}'`, {
        info: (error as Error).message,
      });

      throw error;
    }

    return memo;
  }, [] as any[]);
}

export function initYamlConfig(path?: string): void;
export function initYamlConfig(files?: string[]): void;
export function initYamlConfig(pathOrFiles?: string | string[]): void {
  if (Array.isArray(pathOrFiles)) {
    return loadYamlFiles(pathOrFiles);
  }

  loadYamlFiles(pathOrFiles);
}
