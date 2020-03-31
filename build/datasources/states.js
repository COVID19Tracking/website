const _ = require('lodash/fp')
const { setField, setFieldWith } = require('prairie')
const hash = require('object-hash')
const { sheets } = require('./sheets')
const { addFips, addOldTotal, addTotalResults, totalDate } = require('./utils')
const { sheetVals } = require('../handlers/sheets')

const fixState = _.flow(
  addOldTotal,
  addTotalResults,
  addFips,
  setFieldWith('dateModified', 'lastUpdateEt', totalDate),
  setFieldWith('dateChecked', 'checkTimeEt', totalDate),
  _.set(
    'notes',
    'Please stop using the "total" field. Use "totalTestResults" instead.',
  ),
)
const states = {
  ...sheets,
  sheetName: 'States current',
  fixItems: _.flow(_.map(fixState), _.keyBy('state')),
}

const grade = {
  ...sheets,
  worksheetId: '1_6zwoekv0Mzpp6KEp4OziZizaWxGOxMoDT2C-iBvyEg',
  fixItems: _.flow(
    _.filter(x => x.state && x.grade),
    _.map(
      _.omit([
        'timeOfLastStateUpdateEt',
        'lastCheckTimeEt',
        'checker',
        'doubleChecker',
      ]),
    ),
    _.keyBy('state'),
  ),
}

const prepResult = _.flow(
  _.mergeAll,
  _.map(setField('hash', hash)),
  _.filter('state'),
)
const updateFunc = args =>
  Promise.all([
    sheetVals(grade, '/states/grade', args),
    sheetVals(states, 'states', args),
  ]).then(prepResult)

function getStates(event, args) {
  const updateData = () => updateFunc(args)
  return handleCacheRequest(event, args, updateData, handleResponse2)
}

module.exports = {
  grade,
  statesUpdate: updateFunc,
  states: getStates,
}
