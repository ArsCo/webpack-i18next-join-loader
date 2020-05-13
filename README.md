# webpack-i18next-join-loader
Webpack 4 loader to join translation files. For example, it can be used to join `i18next` files.

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Building](#building)
- [License](#license)

## About
This plugin provides a way to join (merge) multiple translation files separated by UI components (react, Angular,...)
and languages (english, russian, italian,...) into global app or module translation unit files.

It helps:
1. use separate translation files for each separate component at coding phase;
2. join all translation files into global translation units at bundling phase (only imported files will be joined).

For example, if you have two components `A` and `B`, and files hierarchy:
```
|- src/
   |- A/
      |- A.js
      |- index.js
      |- locales/
         |- en.locale.json
         |- ru.locale.json
         |- ge.locale.json
   |- B/
      |- B.js
      |- index.js
      |- locales/
         |- en.locale.json
         |- ru.locale.json
|- public/
```

After bundling there will be:
```
|- src/
   |- A/
      |- A.jsx
      |- index.js
      |- locales/
         |- en.locale.json
         |- ru.locale.json
         |- ge.locale.json
   |- B/
      |- B.jsx
      |- index.js
      |- locales/
         |- en.locale.json
         |- ru.locale.json
|- public/
   |- index.js
   |- locales/
      |- en.locale.json
      |- ru.locale.json
      |- ge.locale.json
```

where `src/A/locales/xx.locale.json` and `src/B/locales/xx.locale.json` will be merged into `public/locales/xx.locale.json`.

## Installation

```bash
npm install --save-dev webpack-i18next-join-loader
```

## Usage

```javascript
const I18NextJoinLoader = require('webpack-i18next-join-loader')

{
  ...
  module: {
      rules: [{
        test: /\.locale\.(json)$/i,
        use: [{
          loader: I18NextJoinLoader.loader(),
          options: {
            // [optional] Default: 'locale/'
            // array can be used too, for example: ['res', 'locale']
            outputDir: 'locale/',
            recursiveMerge: false, // [optional] Default: false
            validation: {
              singleRoot: true, // [optional] Default: true
              uniqueRootPerOutputFile: true // [optional] Default: true
              noRoots: false, // [optional] Default: false
            },
            debug: {
              enable: false, // [optional] Default false
              showRoots: false, // [optional] Default false
            },
          },
        }],
      }],
  }
  ...
}
```

Options:

* **`outputDir`** - output directory for joined locale files;
* **`recursiveMerge`** - if `true` then files will be merged recursively;
* **`validation.singleRoot`** - if `true` then loader will validate that each translation file has only single root key;
* **`validation.uniqueRootPerOutputFile`** - if `true` then loader will validate that each root key is used only in one of merging file.
* **`validation.noRoots`** - if `true` then loader will validate that each translation file has one or more roots;
* **`debug.enable`** - if `true` then debug is enabled, otherwise all debug options will be disabled;
* **`debug.showRoots`** - if `true` then loader will print root keys for each processing translation file.

## Example

### Source files

File `A/locale/en.locale.json`
```json
{
  "A": {
    "name": "Component A",
    "title": "The first component"
  }
}
```

File `A/locale/ru.locale.json`
```json
{
  "A": {
    "name": "Компонент A",
    "title": "Первый компонент"
  }
}
```

File `A/A.jsx`
```jsx
import React from 'react'
import { useTranslation } from 'react-i18next'

// Only imported locales will be used to join
import './locale/en.locale.json'
import './locale/ru.locale.json'


const A = () => {
  // You can use other i18next translation methods or components
  // You must configure i18next instance before use it
  // See i18next and react-i18next documentation
  const { t } = useTranslation()

  // You can use another keys naming schema
  return (
    <div>
      <div>
        {t('A.name')}
      </div>
      <div>
        {t('A.title')}
      </div>
    </div>
  )
}

export default A
```

File `B/locale/en.locale.json`
```json
{
  "B": {
    "decription": "Description of B",
  }
}
```

File `B/locale/ru.locale.json`
```json
{
  "B": {
    "decription": "Описание компонента B",
  }
}
```

File `B/B.jsx`
```jsx
import React from 'react'
import { useTranslation } from 'react-i18next'

// Only imported locales will be used to join
import './locale/en.locale.json'
import './locale/ru.locale.json'


const B = () => {
  const { t } = useTranslation()

  // You can use another keys naming schema
  return (
    <div>
      {t('B.description')}
    </div>
  )
}

export default B
```

### Output files
File `public/locale/en.locale.json`
```json
{
  "A": {
    "name": "Component A",
    "title": "The first component"
  },
  "B": {
    "decription": "Description of B",
  }
}
```

File `public/locale/ru.locale.json`
```json
{
  "A": {
    "name": "Компонент A",
    "title": "Первый компонент"
  },
  "B": {
    "decription": "Описание компонента B",
  }
}
```


## Building

```bash
cd webpack-i18next-join-loader
npm install
npm run clean
npm run build
```

## License

MIT (https://github.com/ArsCo/webpack-i18next-join-loader/blob/master/LICENSE)

## Copyright

Copyright 2018-2020 Arsen Ibragimov (ars)
