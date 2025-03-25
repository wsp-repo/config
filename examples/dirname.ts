import { AjvSchema } from '@zalib/ajv/dist';

import {
  getYamlBoolean,
  getYamlCustom,
  getYamlFileSize,
  getYamlNumber,
  getYamlString,
  getYamlTimespan,
  initYamlConfig,
} from '../src';

initYamlConfig(__dirname);

/*
# default-file
level1:
  sublvl11:
    prop111: 1234
    prop222: 'qwerty'
    prop333: '1d 5h'
    prop444: '1mb'
    prop555: true
  sublvl22:
    - value1
    - value2
    - value3
level2:
  sublvl21:
    prop222: 'orig'

# develop-file
level1:
  sublvl11:
    prop555: false
level2:
  sublvl21:
    prop222: 'overrided'
*/

console.warn(
  `getYamlNumber('$.level1.sublvl11.prop111')`,
  getYamlNumber('$.level1.sublvl11.prop111'),
);

console.warn(
  `getYamlString('$.level1.sublvl11.prop222')`,
  getYamlString('$.level1.sublvl11.prop222'),
);

console.warn(
  `getYamlTimespan('$.level1.sublvl11.prop333')`,
  getYamlTimespan('$.level1.sublvl11.prop333'),
);

console.warn(
  `getYamlFileSize('$.level1.sublvl11.prop444')`,
  getYamlFileSize('$.level1.sublvl11.prop444'),
);

console.warn(
  `getYamlBoolean('$.level1.sublvl11.prop555')`,
  getYamlBoolean('$.level1.sublvl11.prop555'),
);

const schemaArray: AjvSchema<string[]> = {
  items: { type: 'string' },
  type: 'array',
};

console.warn(
  `getYamlCustom('$.level1.sublvl22')`,
  getYamlCustom('$.level1.sublvl22', { schema: schemaArray }),
);

console.warn(
  `getYamlString('$.level2.sublvl21.prop222')`,
  getYamlString('$.level2.sublvl21.prop222'),
);
