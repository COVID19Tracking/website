const _ = require('lodash/fp')
const hash = require('object-hash')
const { sheets } = require('./sheets')
const { compatibility } = require('./utils')

const fixUsCurrent = _.flow(
  compatibility,
  _.set(
    'notes',
    'NOTE: "total", "posNeg", "hospitalized" will be removed in the future.',
  ),
)

function fixUsCurrentItems(newValues, oldVals) {
  const newHash = hash(newValues[0])
  const oldHash = oldVals && oldVals[0].hash
  if (oldHash !== newHash) {
    return fixUsCurrent({
      ...newValues[0],
      hash: newHash,
      lastModified: new Date(),
    })
  }
  return oldVals
}

// const STAGING_WORKSHEETS = '1tGIvo6-Onz7EUMzaMbHm0yJK9gWj1Z5sFWAsnqU4S2Y'

module.exports = {
  ...sheets,
  // worksheetId: STAGING_WORKSHEETS, // Comment this line out to switch back to "live".
  sheetName: 'US current',
  fixItems: fixUsCurrentItems,
  path: 'us/current',
}
