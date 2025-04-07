import { AjvSchema } from '@zalib/ajv';
import { MergeArray, MergeCustom } from '@zalib/core';

export { MergeArray, MergeCustom, MergeOptions } from '@zalib/core';

export enum NoValid {
  Default = 'default',
  Error = 'error',
}

export type BaseOptions<T> = {
  defValue?: T;
  mergeArray?: MergeArray | MergeCustom;
  noValid?: NoValid;
  required?: true;
  schema?: AjvSchema<T>;
};

type RequiredOptions<T> =
  | { defValue: T; required?: true }
  | { defValue?: T; required: true }
  | { defValue: T; required: true };
type WithoutRequired<T> = Omit<BaseOptions<T>, 'defValue' | 'required'>;

export type ReqOptions<T> = RequiredOptions<T> & WithoutRequired<T>;

export type Options<T> = BaseOptions<T> | ReqOptions<T>;
