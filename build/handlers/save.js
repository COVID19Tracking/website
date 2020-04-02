const { emptyDir, outputFile } = require('fs-extra')
const _ = require('lodash/fp')
const { forEachP } = require('understory')
const toCSV = require('./csv')

const DATA_DIR = 'data'

const saveFile = _.curry((fileName, data) =>
  outputFile(fileName, data).then(() => console.log(`Saved file ${fileName}`)),
)

const getFileName = (ext, path, version) =>
  `${DATA_DIR}/v${version || 1}/${path}.${ext}`

function saveCSV({ path, value, version }) {
  return toCSV(value).then(saveFile(getFileName('csv', path, version)))
}
function saveJSON({ path, value, version }) {
  return saveFile(getFileName('json', path, version), JSON.stringify(value))
}

// fs.writeFileSync
const saveFiles = _.flow(_.over([saveCSV, saveJSON]), x => Promise.all(x))

function saveAll(files) {
  return forEachP(saveFiles, files)
}

function clearDir() {
  console.log('Removing contents from data directory.')
  return emptyDir(DATA_DIR)
}
module.exports = {
  clearDir,
  saveAll,
}
