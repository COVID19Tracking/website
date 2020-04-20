const _ = require('lodash/fp')
const { fetchJson } = require('./fetch')
const { getVals, runSearch } = require('./utils')

const fixVals = _.flow(
  x => console.log(_.omit(['values'], x)) || x,
  _.get('values'),
  ([keys, ...values]) =>
    _.map(
      _.zipObject(_.map(_.camelCase, keys)), // process keys
      _.map(getVals, values), // process values
    ),
)

function getSheet({ worksheetId, sheetName, key }) {
  console.log(`Fetching sheet ${sheetName} from ${worksheetId}.`)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${worksheetId}/values/${sheetName}?key=${key}`
  return (
    fetchJson(url)
      .then(x => {
        if (x.error) {
          throw new Error(`Google Sheets is not available. HTTP code: ${x.error.code} (${x.error.message})`)
        }
      })
      .then(fixVals)
  )
}

module.exports = {
  getSheet,
  runSearch,
}
