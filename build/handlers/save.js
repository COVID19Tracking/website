const { emptyDir, outputFile } = require('fs-extra')
const _ = require('lodash/fp')
const { forEachP } = require('understory')
const toCSV = require('./csv')

const DATA_DIR = 'data'

const saveFile = _.curry((fileName, data) =>
  outputFile(`${DATA_DIR}/${fileName}`, data),
)

function saveCSV({ path, value }) {
  return toCSV(value).then(saveFile(`${path}.csv`))
}
function saveJSON({ path, value }) {
  return saveFile(`${path}.json`, JSON.stringify(value))
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
