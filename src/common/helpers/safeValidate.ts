import { ajvFactory, AjvSchema } from '@zalib/ajv';

const ajvValidator = ajvFactory();

type ValidateResult<T> = {
  errors?: string[];
  path: string;
  value?: T;
};

/**
 * Безопасно валидирует объект, если есть схема валидации
 */
export function safeValidate<T>(
  value: unknown,
  schema: AjvSchema<T>,
  path: string,
): ValidateResult<T> {
  if (ajvValidator.validate(schema, value)) {
    return { path, value };
  }

  const errors = ajvValidator.errors?.length
    ? ajvValidator.errors.map(String)
    : ['Unknown schema error'];

  return { errors, path };
}
