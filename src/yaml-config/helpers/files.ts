/* eslint-disable @typescript-eslint/no-explicit-any */

import { fsStatSafe, getRootPath } from '@zalib/core';

/*
import { createLogger } from '../../logger';

export const logger = createLogger('YamlConfig');
*/

const DEFAULT_SUFFIX = 'default';

/**
 * Возвращает суффикс по режиму работы сервиса
 */
function getFileSuffix(): string {
  return (process.env.NODE_ENV || '').toLowerCase().trim();
}

/**
 * Возвращает путь к файлу с проверкой существования
 */
function getFileWithCheck(filePath: string, required?: true): string {
  if (fsStatSafe(filePath)?.isFile()) return filePath;

  if (required) throw new Error(`File ${filePath} not found`);

  return '';
}

/**
 * Возвращает список файлов для чтения конфигурации
 */
export function getYamlFiles(path?: string): string[] {
  const rootPath = path || getRootPath();
  const envSuffix = getFileSuffix();

  // обязательный файл настроек
  const defFile = getFileWithCheck(
    `${rootPath}/config.${DEFAULT_SUFFIX}.yml`,
    true,
  );

  // необязательный файл настроек
  const nodeFile =
    envSuffix.length && envSuffix !== DEFAULT_SUFFIX
      ? getFileWithCheck(`${rootPath}/config.${envSuffix}.yml`)
      : getFileWithCheck(`${rootPath}/config.yml`);

  // обязательный, если передан
  const envFile = process.env.APP_CONFIG_YAML
    ? getFileWithCheck(process.env.APP_CONFIG_YAML, true)
    : '';

  return [defFile, nodeFile, envFile].filter(Boolean);
}
