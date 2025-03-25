import { AjvSchema } from '@zalib/ajv';

export enum YamlMerge {
  Append = 'append',
  Combine = 'combine',
  Overwrite = 'overwrite',
}

export enum YamlNoValid {
  Default = 'default',
  Error = 'error',
}

export type YamlBaseOptions<T> = {
  arrayMerge?: YamlMerge;
  defValue?: T;
  noValid?: YamlNoValid;
  required?: true;
  schema?: AjvSchema<T>;
};

type RequiredOptions<T> =
  | { defValue: T; required?: true }
  | { defValue?: T; required: true }
  | { defValue: T; required: true };
type WithoutRequired<T> = Omit<YamlBaseOptions<T>, 'defValue' | 'required'>;

export type YamlReqOptions<T> = RequiredOptions<T> & WithoutRequired<T>;

export type YamlOptions<T> = YamlBaseOptions<T> | YamlReqOptions<T>;
