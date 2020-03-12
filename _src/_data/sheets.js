const _ = require('lodash/fp')
// Using fetch() because it matches native use in browser. Easier copy/paste.
const fetch = require('node-fetch')

const getJson = (url) => fetch(url).then(res => res.json())

const mergeStateInfo = _.flow(
  _.map(_.keyBy('state')),
  _.mergeAll,
  _.values,
)

module.exports = function() {
  return Promise.all([
    getJson('https://covid.cape.io/states'),
    getJson('https://covid.cape.io/states/info'),
  ]).then(([stateTest, stateInfo]) => ({
    states: mergeStateInfo([stateTest, stateInfo]),
  }))
}
