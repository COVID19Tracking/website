const _ = require('lodash/fp')
const { copy, setField, setFieldWith } = require('prairie')
const hash = require('object-hash')
const { sheets } = require('./sheets')
const { addFips, compatibility, totalDate } = require('./utils')
const { fetchParseFix } = require('../handlers')

// OLD SHEET
const fixState = _.flow(
  compatibility,
  addFips,
  setFieldWith('dateModified', 'lastUpdateEt', totalDate),
  setFieldWith('dateChecked', 'checkTimeEt', totalDate),
  _.set(
    'notes',
    'Please stop using the "total" field. Use "totalTestResults" instead.',
  ),
)

// const states = {
//   ...sheets,
//   sheetName: 'States current',
//   fixItems: _.flow(_.map(fixState), _.keyBy('state')),
// }

// NEW SHEET

const fixState2 = _.flow(
  copy('deaths', 'death'),
  copy('hospitalizedCumulative', 'hospitalized'),
  fixState,
)

const states2 = {
  ...sheets,
  sheetName: 'States current',
  fixItems: _.flow(_.map(fixState2), _.keyBy('state')),
}

const grade = {
  ...sheets,
  worksheetId: '1_6zwoekv0Mzpp6KEp4OziZizaWxGOxMoDT2C-iBvyEg',
//   worksheetId: '1MrjtmYpfKxzn0-oNEdxXzTtfifZ0ZMkMR7k9_WXtTPs',
//   path: 'states/grades',
  sheetName: 'Publishing',
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
  Promise.all([
    fetchParseFix(grade).then(_.keyBy('state')),
    fetchParseFix(states2),
  ]).then(prepResult)

const statePages = _.flatMap(value => [
  {
    path: `states/${value.state}/current`,
    value,
  },
  {
    path: `states/${value.state.toLowerCase()}/current`,
    value,
  },
])

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
  // states2,
}
