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

function rejectOnError(result) {
  if (result.error) {
    const msg = `Google Sheets error. HTTP code: ${result.error.code} (${result.error.message})`
    return Promise.reject(msg)
  }
  return result
}

function getSheet({ worksheetId, sheetName, key }) {
  console.log(`Fetching sheet ${sheetName} from ${worksheetId}.`)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${worksheetId}/values/${sheetName}?key=${key}`
  return fetchJson(url)
    .then(rejectOnError)
    .then(fixVals)
}

module.exports = {
  getSheet,
  runSearch,
}
