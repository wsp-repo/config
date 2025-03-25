import { AjvSchema } from '../src';

export type Example = {
  optString?: string;
  reqString: string;
};

export const exampleSchema: AjvSchema<Example> = {
  additionalProperties: false,
  properties: {
    optString: {
      nullable: true,

      type: 'string',

      validate: (value: string) => {
        return value ? value === 'ok' : true;
      },
    },
    reqString: {
      type: 'string',

      validate: (value: string) => {
        return value === 'ok';
      },
    },
  },

  required: ['reqString'],

  type: 'object',
};
