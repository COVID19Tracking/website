const jsonexport = require('jsonexport')

const toCSV = value =>
  new Promise((resolve, reject) => {
    jsonexport(value, (err, csv) => {
      if (err) return reject(err.stack || err)
      return resolve(csv)
    })
  })

module.exports = toCSV
