# webpack-i18next-join-loader
Webpack loader to join translation files. For example, it can be used to join `i18next` files.

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## About
This plugin provides a way to join (merge) multiple translation files separated by UI components (react, Angular,...)
and languages (english, russian, italian,...) into global application or module translation unit files.

It hepls:
1. use separate translation files for each separate component at coding phase;
2. join translation files for using component into global translation units at bundling phase.

For example, if you have two components A and B, and files hierarchy:
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

After bundling you will have:
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
   |- index.js
   |- locales/
      |- en.locale.json
      |- ru.locale.json
      |- ge.locale.json
```

where `src/A/locales/xx.locale.json` and `src/B/locales/xx.locale.json` will be merged to `public/locales/xx.locale.json`.

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
            outputDir: 'locale/',
            recursiveMerge: false,
            validation: {
              singleRoot: true,
              uniqueRootPerOutputFile: true
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


## License

MIT (https://github.com/ArsCo/webpack-i18next-join-loader/blob/master/LICENSE)

## Copyright

Copyright 2018-2020 Arsen Ibragimov (ars)
