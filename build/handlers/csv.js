const jsonexport = require('jsonexport')
const { alwaysArray } = require('./utils')

const toCSV = values =>
  new Promise((resolve, reject) => {
    jsonexport(alwaysArray(values), (err, csv) => {
      if (err) return reject(err.stack || err)
      return resolve(csv)
    })
  })

module.exports = toCSV
