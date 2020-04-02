const { emptyDir, outputFile } = require('fs-extra')
const _ = require('lodash/fp')
const { forEachP } = require('understory')
const toCSV = require('./csv')
const toHTML = require('./html')

const DATA_DIR = '_data'

const saveFile = _.curry((fileName, data) =>
  outputFile(fileName, data).then(() => console.log(`Saved file ${fileName}`)),
)

const getFileName = (ext, { path, version }) =>
  `${DATA_DIR}/v${version || 1}/${path}.${ext}`

function saveCSV({ value, ...info }) {
  return toCSV(value).then(saveFile(getFileName('csv', info)))
}
function saveJSON({ value, ...info }) {
  return saveFile(getFileName('json', info), JSON.stringify(value))
}
function saveHTML({ value, ...info }) {
  return saveFile(getFileName('html', info), toHTML(value))
}

const saveFiles = _.flow(_.over([saveCSV, saveJSON, saveHTML]), x =>
  Promise.all(x),
)

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
