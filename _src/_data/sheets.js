const _ = require('lodash/fp')
const { setFieldWith } = require('prairie')
// Using fetch() because it matches native use in browser. Easier copy/paste.
const fetch = require('node-fetch')
// https://date-fns.org/v2.10.0/docs/format
const { format, utcToZonedTime } = require('date-fns-tz')

const getJson = url => fetch(url).then(res => res.json())
function dateStr(date) {
  const pattern = "M/dd HH:mm 'ET'"
  const timeZone = 'America/New_York'
  const zonedDate = utcToZonedTime(date, timeZone)
  return format(zonedDate, pattern, { timeZone })
}

const mergeStateInfo = _.flow(
  _.map(_.keyBy('state')),
  _.mergeAll,
  _.sortBy('name'),
)

const pressLinks = _.flow(
  _.filter({ addToCovidTrackingProjectWebsite: true }),
  _.orderBy(['publishDate'], ['desc']),
)
module.exports = function() {
  return Promise.all([
    getJson('https://covidtracking.com/api/states'),
    getJson('https://covidtracking.com/api/states/info'),
    getJson('https://covidtracking.com/api/states/daily'),
    getJson('https://covidtracking.com/api/us'),
    getJson('https://covidtracking.com/api/us/daily'),
    getJson('https://covidtracking.com/api/press'),
  ]).then(([stateTest, stateInfo, stateDaily, us, usDaily, press]) => ({
    updated: dateStr(new Date()),
    us: us[0],
    states: mergeStateInfo([stateTest, stateInfo]),
    stateDaily: _.orderBy(['date'], ['desc'], stateDaily),
    usDaily: _.orderBy(['date'], ['desc'], usDaily),
    press: pressLinks(press),
  }))
}
