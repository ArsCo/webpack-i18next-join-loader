const path = require('path')
const _ = require('lodash')

function getFileName(filePath) {
  return path.basename(filePath)
}

function getFilePath(dirs, fileName) {
  if (_.isArray(dirs)) {
    return path.join(...dirs, fileName)
  }
  return path.join(dirs, fileName)
}

module.exports = {
  getFileName,
  getFilePath,
}
