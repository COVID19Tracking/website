const _ = require('lodash/fp')
const { copy, move, setField, setFieldWith } = require('prairie')
const { addHours, format, formatISO, parse, parseISO } = require('date-fns/fp')
const { zonedTimeToUtc } = require('date-fns-tz/fp')
const hash = require('object-hash')
const { fipsByCode, nameByCode } = require('./stateNames')

const toDate = _.flow(zonedTimeToUtc('America/New_York'), formatISO)
function tryParse(templateStr) {
  return dateStr => {
    return parse(new Date(), templateStr, dateStr)
  }
}

const dailyFormat = 'yyyyMMdd'
const dailyDate = _.flow(tryParse(dailyFormat), addHours(16), toDate)
const toDailyDate = _.flow(parseISO, format(dailyFormat))

const totalDate = _.flow(tryParse('M/dd HH:mm'), toDate)
const parseScreenshotDate = _.flow(
  // remove all letters.
  _.replace(/^[a-zA-Z]+/, ''),
  tryParse('yyyyMMddHHmmss'),
  toDate,
)
// 20200327190023
function screenshotDate(dateStr) {
  if (/^\d+/.test(dateStr) && dateStr.length === 14)
    return parseScreenshotDate(dateStr)
  console.error('INVALID DATE', dateStr)
  return null
}
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

const compatibility = _.flow(
  move('deaths', 'death'),
  copy('hospitalizedCumulative', 'hospitalized'),
  addOldTotal,
  addTotalResults,
  copy('totalTestResults', 'posNeg'),
)
module.exports = {
  addDailyDateChecked,
  addFips,
  addHash,
  addName,
  addOldTotal,
  addTotalResults,
  compatibility,
  dailyDate,
  screenshotDate,
  toDailyDate,
  totalDate,
}
