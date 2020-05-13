const formatRoots = (array) => {
  return array.map(v => `'${v}'`).join(', ', '[', ']')
}

module.exports = {
  formatRoots,
}
