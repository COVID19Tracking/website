const _ = require('lodash/fp')
const {
  addDailyDateChecked,
  addFips,
  addHash,
  addName,
  compatibility,
} = require('./utils')

const sheets = {
  app: 'sheets',
  worksheetId: '18oVRrHj3c183mHmq3m89_163yuYltLNlOmPerQ18E8w',
  sheetName: 'Sheet1',
  key: global.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY,
  ttl: 300,
}

const newVals = {
  deathIncrease: null,
  hospitalizedIncrease: null,
  negativeIncrease: null,
  positiveIncrease: null,
  totalTestResultsIncrease: null,
}
function getIncrease(now, prev, fieldId) {
  if (!now[fieldId]) return 0
  const prevVal = prev[fieldId] || 0
  return now[fieldId] - prevVal
}
function getNewVals(now, prev) {
  if (!prev) return newVals
  return {
    deathIncrease: getIncrease(now, prev, 'death'),
    hospitalizedIncrease: getIncrease(now, prev, 'hospitalized'),
    negativeIncrease: getIncrease(now, prev, 'negative'),
    positiveIncrease: getIncrease(now, prev, 'positive'),
    totalTestResultsIncrease: getIncrease(now, prev, 'totalTestResults'),
  }
}

function fixDaily(items) {
  let previous = null
  return _.flow(
    _.orderBy(['date'], ['asc']),
    _.map(
      _.flow(addHash, addDailyDateChecked, compatibility, addFips, item => {
        const increases = getNewVals(item, previous)
        previous = item
        return { ...item, ...increases }
      }),
    ),
    _.orderBy(['date'], ['desc']),
  )(items)
}
const fixStatesInfo = _.map(_.flow(addFips, addName))

const statesInfo = {
  ...sheets,
  fixItems: fixStatesInfo,
  sheetName: 'States',
  path: 'states/info',
}

const cdcTests = {
  ...sheets,
  name: 'CDC Tests',
  worksheetId: '16gBHQ7dCJK1psqEMasmLKiFlzoNKcfNujVpmHLHldSY',
  path: 'cdc/daily',
}
const press = {
  ...sheets,
  worksheetId: '1-lvGZ3NgVlda4EcF5t_AVFLnBqz-TOl4YZxYH_mJF_4',
  fixItems: _.orderBy(['publishDate'], ['desc']),
  path: 'press',
}

// lastIncrementalUpdate

const counties = {
  ...sheets,
  name: 'County Information',
  sheetName: 'Counties',
  path: 'counties',
}

module.exports = {
  cdcTests,
  counties,
  fixDaily,
  press,
  sheets,
  statesInfo,
}
