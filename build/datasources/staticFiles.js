const _ = require('lodash')
const fs = require('fs');

const staticFiles = fs.readdirSync('build/static')

function createFile(file, value) {
  return {
    path: `static/${file.split('.').slice(0, -1).join('.')}`,
    value,
  }
}

function createPages(value) {
  const data = _.zipWith(staticFiles, value, createFile)
  return [
    {
      path: 'static',
      value: data,
    },
    ...data
  ]
}

function fixItems(items) {
  return _.map(_.invokeMap(items, Buffer.prototype.toString), JSON.parse)
}

module.exports = {
  app: 'file',
  files: staticFiles,
  fixItems: fixItems,
  createPages,
}
