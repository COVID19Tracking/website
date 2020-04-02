const _ = require('lodash/fp')
const { fixDaily, sheets } = require('./sheets')

const datePages = _.map(value => ({
  path: `us/${value.date}`,
  value,
}))

function createPages(value) {
  return [
    {
      path: 'us/daily',
      value,
    },
    ...datePages(value),
  ]
}

module.exports = {
  ...sheets,
  fixItems: fixDaily,
  sheetName: 'US daily 4 pm ET',
  createPages,
}
