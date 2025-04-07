import { AjvSchema } from '@zalib/ajv';
import { FileSize, Timespan } from '@zalib/core';

export const numberSchema: AjvSchema<number> = {
  type: 'number',
};

export const stringSchema: AjvSchema<string> = {
  type: 'string',
};

export const booleanSchema: AjvSchema<boolean> = {
  type: 'boolean',
};

export const fileSizeSchema: AjvSchema<string | number> = {
  oneOf: [
    { minLength: 1, type: 'string' },
    { minimum: 0, type: 'number' },
  ],

  validate: (value: string | number) => {
    return FileSize.isValid(value);
  },
};

export const timespanSchema: AjvSchema<string | number> = {
  oneOf: [
    { minLength: 1, type: 'string' },
    { minimum: 0, type: 'number' },
  ],

  validate: (value: string | number) => {
    return Timespan.isValid(value);
  },
};
