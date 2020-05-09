const { getOptions } = require('loader-utils')
const validate = require('schema-utils')

const LOADER_NAME = 'I18NextMergeLoader'

const schema = {
  type: 'object',
  properties: {
    outputDir: {
      anyOf: [{
        type: 'string',
      }, {
        type: 'array',
      }],
    },
    validation: {
      type: 'object',
      properties: {
        singleRoot: {
          type: 'boolean',
        },
      },
    },
    recursiveMerge: {
      type: 'boolean',
    },
  },
}

const defaultOptions = {
  outputDir: 'locale/',
  validation: {
    singleRoot: true,
    uniqueRootPerOutputFile: true,
  },
  recursiveMerge: false,
}

function getMergedOptions(obj) {
  const configOptions = getOptions(obj)
  validate(schema, configOptions, { name: LOADER_NAME, baseDataPath: 'options' })

  return { ...defaultOptions, ...configOptions }
}

module.exports = {
  defaultOptions,
  schema,
  getOptions: getMergedOptions,
}
