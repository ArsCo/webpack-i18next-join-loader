const { formatRoots } = require('./utils')

const mergedRoots = {}

function getRootsCount(json) {
  const roots = Object.keys(json)
  return roots.length
}

function validateSingleRoot(path, json) {
  const rootsCount = getRootsCount(json)
  if (rootsCount > 1) {
    const roots = Object.keys(json)
    throw new Error(
      `There are ${rootsCount} root keys (more than one) for '${path}': '${formatRoots(roots)}'.
      Set 'validation.singleRoot = false' or remove root keys.`,
    )
  }
}

function validateNoRoot(path, json) {
  if (getRootsCount(json) === 0) {
    throw new Error(
      `There are no root keys for '${path}'. Set 'validation.noRoots = false' or add root keys.`,
    )
  }
}

function validateUniqueRootPerOutputFile(fileName, json) {
  const fileNameMegredRoots = mergedRoots[fileName] || []
  const rootKeys = Object.keys(json)
  rootKeys.forEach(root => {
    if (fileNameMegredRoots.includes(root)) {
      throw new Error(`Already have root '${root}' for merged file '${fileName}'`)
    }
  })
  mergedRoots[fileName] = [...fileNameMegredRoots, ...rootKeys]
}

function validate(validationOptions, path, fileName, json) {
  const { singleRoot, noRoots, uniqueRootPerOutputFile } = validationOptions

  if (singleRoot) {
    validateSingleRoot(path, json)
  }
  if (noRoots) {
    validateNoRoot(path, json)
  }
  if (uniqueRootPerOutputFile) {
    validateUniqueRootPerOutputFile(fileName, fileName)
  }
}


module.exports = {
  validate,
}
