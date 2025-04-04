/**
 * Вызывает исключение с фиксацией ошибки
 */
export function throwError(message: string, errors?: unknown[]): never {
  const errorMessage = errors?.length
    ? `${message}: ${errors.join(', ')}`
    : message;

  throw new Error(errorMessage);
}
