const _ = require('lodash/fp')
const { DateTime } = require('luxon')
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

const mergeStateDaily = (stateDaily, screenshots) => {
  stateDaily = _.orderBy(['date'], ['desc'], stateDaily)
  stateDaily.forEach(daily => {
    daily.screenshots = []
    if (typeof screenshots[daily.state] !== 'undefined') {
      screenshots[daily.state].forEach(screenshot => {
        if (
          DateTime.fromISO(screenshot.dateChecked).toLocaleString() ===
          DateTime.fromISO(daily.dateChecked).toLocaleString()
        ) {
          daily.screenshots.push(screenshot)
        }
      })
    }
  })
  return stateDaily
}

const pressLinks = _.flow(
  _.filter(item => item.addToCovidTrackingProjectWebsite && item.title),
  _.orderBy(['publishDate'], ['desc']),
)

module.exports = function() {
  return Promise.all([
    getJson('https://covid.cape.io/states'),
    getJson('https://covid.cape.io/states/info'),
    getJson('https://covid.cape.io/states/daily'),
    getJson('https://covid.cape.io/us'),
    getJson('https://covid.cape.io/us/daily'),
    getJson('https://covid.cape.io/screenshots'),
    getJson('https://covid.cape.io/press'),
  ]).then(
    ([stateTest, stateInfo, stateDaily, us, usDaily, screenshots, press]) => ({
      updated: dateStr(new Date()),
      us: us[0],
      states: mergeStateInfo([stateTest, stateInfo]),
      stateDaily: mergeStateDaily(stateDaily, screenshots),
      usDaily: _.orderBy(['date'], ['desc'], usDaily),
      press: pressLinks(press),
    }),
  )
}
