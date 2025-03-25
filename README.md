# Package @zalib/config

## Getting started

```
npm i @zalib/config
```

## Init config

```
import { initYamlConfig } from '@zalib/config'

initYamlConfig();

initYamlConfig(PATH_FILES);

initYamlConfig(LIST_FILES);

```

## Methods

```
getYamlBoolean(jsonPath, options)
getYamlCustom(jsonPath, options)
getYamlFileSize(jsonPath, options)
getYamlNumber(jsonPath, options)
getYamlString(jsonPath, options)
getYamlTimespan(jsonPath, options)
```

## Decorators

```
YamlBoolean(jsonPath, options)
YamlCustom(jsonPath, options)
YamlFileSize(jsonPath, options)
YamlNumber(jsonPath, options)
YamlString(jsonPath, options)
YamlTimespan(jsonPath, options)
```
