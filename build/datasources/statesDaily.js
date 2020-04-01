const _ = require('lodash/fp')
const { fixDaily, sheets } = require('./sheets')

const datePages = _.map(value => ({
  path: `state/${value.state}/${value.date}`,
  value,
}))

const statePages = _.flow(
  _.groupBy('state'),
  _.flatMap(value => [
    { path: `state/${value[0].state}/daily`, value },
    ...datePages(value),
  ]),
)

function createPages(value) {
  return [
    {
      path: 'states/daily',
      value,
    },
    ...statePages(value),
  ]
}

const fixItems = _.flow(
  _.groupBy('state'),
  _.flatMap(fixDaily),
  _.orderBy(['date', 'state'], ['desc', 'asc']),
)

module.exports = {
  ...sheets,
  fixItems,
  sheetName: 'States daily 4 pm ET',
  createPages,
}
