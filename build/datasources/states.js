const _ = require('lodash/fp')
const { setField, setFieldWith } = require('prairie')
const hash = require('object-hash')
const { sheets } = require('./sheets')
const { addFips, addOldTotal, addTotalResults, totalDate } = require('./utils')
const { fetchParseFix } = require('../handlers')

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
  path: 'states/grades',
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
    // _.keyBy('state'),
  ),
}

const prepResult = _.flow(
  _.mergeAll,
  _.map(setField('hash', hash)),
  _.filter('state'),
)
const updateFunc = () =>
  Promise.all([fetchParseFix(grade), fetchParseFix(states)]).then(prepResult)

const statePages = _.map(value => ({
  path: `state/${value.state}/current`,
  value,
}))

function createPages(value) {
  return [{ path: '/states/current', value }, ...statePages(value)]
}

module.exports = {
  grade,
  states: {
    fetch: updateFunc,
    path: 'states/current',
    createPages,
  },
}
