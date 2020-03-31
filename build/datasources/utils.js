const _ = require('lodash/fp')
const { setField, setFieldWith } = require('prairie')
const { addHours, formatISO, parse } = require('date-fns/fp')
const { zonedTimeToUtc } = require('date-fns-tz/fp')
const hash = require('object-hash')
const { fipsByCode, nameByCode } = require('./stateNames')

const toDate = _.flow(zonedTimeToUtc('America/New_York'), formatISO)
function tryParse(templateStr) {
  return dateStr => {
    return parse(new Date(), templateStr, dateStr)
  }
}

const dailyDate = _.flow(tryParse('yyyyMMdd'), addHours(16), toDate)
const totalDate = _.flow(tryParse('M/dd HH:mm'), toDate)
const screenshotDate = _.flow(
  // remove all letters.
  _.replace(/^[a-zA-Z]+/, ''),
  tryParse('yyyyMMddHHmmss'),
  toDate,
)
const addName = setFieldWith('name', 'state', nameByCode)
const addFips = setFieldWith('fips', 'state', fipsByCode)

const addDailyDateChecked = setFieldWith('dateChecked', 'date', dailyDate)
const sumFields = fields => _.flow(_.at(fields), _.sum)
const addTotalResults = setField(
  'totalTestResults',
  sumFields(['positive', 'negative']),
)
const addOldTotal = setField(
  'total',
  sumFields(['positive', 'negative', 'pending']),
)
const addHash = setField('hash', hash)

module.exports = {
  addDailyDateChecked,
  addFips,
  addHash,
  addName,
  addOldTotal,
  addTotalResults,
  dailyDate,
  screenshotDate,
  totalDate,
}
