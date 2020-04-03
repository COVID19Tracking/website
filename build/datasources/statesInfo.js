const _ = require('lodash/fp')
const { addFips, addName } = require('./utils')
const { sheets } = require('./sheets')

const fixStatesInfo = _.map(_.flow(addFips, addName))

const statePages = _.flatMap(value => [
  {
    path: `states/${value.state}/info`,
    value,
  },
])

function createPages(value) {
  return [{ path: 'states/info', value }, ...statePages(value)]
}

module.exports = {
  ...sheets,
  fixItems: fixStatesInfo,
  sheetName: 'States',
  path: 'states/info',
  createPages,
}
