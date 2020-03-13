const _ = require('lodash/fp')
const { setFieldWith } = require('prairie')
// Using fetch() because it matches native use in browser. Easier copy/paste.
const fetch = require('node-fetch')
// https://date-fns.org/v2.10.0/docs/format
const { format, utcToZonedTime } = require('date-fns-tz')
const getJson = (url) => fetch(url).then(res => res.json())
function dateStr(date) {
  const pattern = "M/dd HH:mm 'ET'"
  const timeZone = 'America/New_York'
  const zonedDate = utcToZonedTime(date, timeZone)
  return format(zonedDate, pattern, { timeZone })
}
const getStateName = _.propertyOf({
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
})

const mergeStateInfo = _.flow(
  _.map(_.keyBy('state')),
  _.mergeAll,
  _.map(setFieldWith('stateName', 'state', getStateName)),
)

module.exports = function() {
  return Promise.all([
    getJson('https://covid.cape.io/states'),
    getJson('https://covid.cape.io/states/info'),
    getJson('https://covid.cape.io/us'),
  ]).then(([stateTest, stateInfo, us]) => ({
    updated: dateStr(new Date()),
    us: us[0],
    states: mergeStateInfo([stateTest, stateInfo]),
  }))
}
