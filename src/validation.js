
const mergedRoots = {}

function validateSingleRoot(json) {
  const roots = Object.keys(json)
  const rootsCount = roots.length
  if (rootsCount > 1) {
    throw new Error(
      `There ars ${rootsCount} root keys (more than one) for '${this.resourcePath}': '${roots}'.
      Set 'validation.singleRoot = false' or remove root keys.`,
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

function validate(validationOptions, fileName, json) {
  if (validationOptions.singleRoot) {
    validateSingleRoot(json)
  }
  if (validationOptions.uniqueRootPerOutputFile) {
    validateUniqueRootPerOutputFile(fileName, fileName)
  }
}


module.exports = {
  validate,
}
