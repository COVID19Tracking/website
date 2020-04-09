const _ = require('lodash')
const path = require('path')
const fsPromises = require('fs').promises

function getFullPath(file) {
  return path.join('build', 'static', file)
}

function readFile(path) {
  return fsPromises.readFile(path)
}

function getFile({files}) {
  const paths = _.map(files, getFullPath)
  return Promise.all(_.map(paths, readFile))
}

module.exports = getFile
