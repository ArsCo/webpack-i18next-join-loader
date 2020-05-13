const merge = require('merge')

const config = require('./config')
const { validate } = require('./validation')
const { getFileName, getFilePath } = require('./file')
const { formatRoots } = require('./utils')

const results = {}

const I18NextJoinLoader = function loader(source) {
  const addStringAsset = (function addStringAsset(sourcePath, sourceString) {
    // eslint-disable-next-line no-underscore-dangle
    this._compilation.assets[sourcePath] = {
      source: function getSource() {
        return sourceString
      },
      size: function getSize() {
        return sourceString.length
      },
    }
  }).bind(this)

  function getMergeFunction(options) {
    return options.recursiveMerge ? merge.recursive : merge
  }

  const options = config.getOptions(this)

  const fileName = getFileName(this.resourcePath)
  const fileJson = JSON.parse(source)

  const { debug } = options
  if (debug.enable) {
    if (debug.showRoots) {
      console.debug(`Roots [ ${formatRoots(Object.keys(fileJson))} ] of '${this.resourcePath}'`)
    }
  }

  validate(options.validation, this.resourcePath, fileName, fileJson)



  const mergeFunction = getMergeFunction(options)
  const currentValue = results[fileName] || {}
  const newValue = mergeFunction(currentValue, fileJson)
  results[fileName] = newValue

  const filePath = getFilePath(options.outputDir, fileName)
  const jsonString = JSON.stringify(results[fileName])

  addStringAsset(filePath, jsonString)

  return source
}

module.exports = I18NextJoinLoader
