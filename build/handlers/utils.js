const _ = require('lodash/fp')

function getVal(value) {
  const result = _.trim(value)
  if (result === '') return null
  if (result.toUpperCase() === 'N' || result.toUpperCase() === 'FALSE')
    return false
  if (result.toUpperCase() === 'Y' || result.toUpperCase() === 'TRUE')
    return true
  if (result.match(/^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/))
    return Number(result.replace(/,/g, ''))
  if (!isNaN(result)) return Number(result)
  return result
}

function runSearch(search) {
  if (_.isEmpty(search)) return _.identity
  return _.flow(_.filter(_.mapValues(getVal, search)), x =>
    x.length === 1 ? x[0] : x,
  )
}
function runFinalPrep(args) {
  if (!args.route || !_.isFunction(args.route.finalPrep)) return _.identity
  return _.partial(args.route.finalPrep, [args])
}
const alwaysArray = x => (_.isArray(x) ? x : [x])

module.exports = {
  alwaysArray,
  getVal,
  getVals: _.map(getVal),
  runFinalPrep,
  runSearch,
}
