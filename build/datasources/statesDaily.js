const _ = require('lodash/fp')
const { fixDaily, sheets } = require('./sheets')

// Each state, specific date.
const stateDatePages = _.flatMap(value => [
  {
    path: `states/${value.state}/${value.date}`,
    value,
  },
  {
    path: `states/${value.state.toLowerCase()}/${value.date}`,
    value,
  },
])

// Each state with all dates.
const statePages = _.flow(
  _.groupBy('state'),
  _.flatMap(value => [
    { path: `states/${value[0].state}/daily`, value },
    { path: `states/${value[0].state.toLowerCase()}/daily`, value },
    ...stateDatePages(value),
  ]),
)

// All states by date.
const datePages = _.flow(
  _.groupBy('date'),
  _.map(value => ({
    path: `states/${value[0].date}`,
    value,
  })),
)

// Create All Page Options.
function createPages(value) {
  return [
    {
      path: 'states/daily',
      value,
    },
    ...statePages(value),
    ...datePages(value),
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
  // worksheetId: '1MvvbHfnjF67GnYUDJJiNYUmGco5KQ9PW0ZRnEP9ndlU',
  // sheetName: 'States Daily New!A:M',
  createPages,
}
