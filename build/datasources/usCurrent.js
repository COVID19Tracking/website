const _ = require('lodash/fp')
const hash = require('object-hash')
const { sheets } = require('./sheets')
const { compatibility } = require('./utils')

const fixUsCurrent = _.flow(
  compatibility,
  _.set(
    'notes',
    'Please stop using the "total" and "posNeg" fields. Use "totalTestResults" instead.',
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

module.exports = {
  ...sheets,
  sheetName: 'US current',
  fixItems: fixUsCurrentItems,
  path: 'us/current',
}
