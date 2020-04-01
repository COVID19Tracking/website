const _ = require('lodash/fp')
const { fetchJson } = require('./fetch')
const { getVals, runSearch } = require('./utils')

const fixVals = _.flow(_.get('values'), ([keys, ...values]) =>
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
      // .then(x => console.log(x) || x)
      // .then(rejectError)
      .then(fixVals)
  )
}

module.exports = {
  getSheet,
  runSearch,
}
