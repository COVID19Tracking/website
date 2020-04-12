const fs = require('fs')

/**
 * Import the states daily json file
 */
const statesDaily = JSON.parse(
  fs.readFileSync('./_data/v1/states/daily.json', 'utf8'),
)

/**
 * List of states
 */
const uniqueStates = [...new Set(statesDaily.map(item => item.state))]

/**
 * These arrays capture the observed anomalies in cumulative testing results.
 * Explanation:
 * Since state websites serve as the AOR for cumulative data, their regressions
 * result in errors in our cumulative positive/negative tests.
 *
 * We should verify these anomalies with QA/Data teams and then enter them here.
 * These anomalies will be removed from the data in tests below so that these
 * tests will pass. When new anomalies are found, they should be verified with
 * QA/Data and only then should be entered into the arrays of allowed anomalies
 * below.
 */

const allowedNegativeAnomalies = [
  {
    state: 'AK',
    date: 20200413,
    positive: 277,
    negative: 7553,
  },
  {
    state: 'AK',
    date: 20200412,
    positive: 272,
    negative: 7766,
  },
  {
    state: 'DE',
    date: 20200410,
    positive: 1326,
    negative: 10415,
  },
  {
    state: 'WI',
    date: 20200330,
    positive: 1221,
    negative: 15856,
  },
  {
    state: 'WI',
    date: 20200329,
    positive: 1112,
    negative: 16550,
  },
  {
    state: 'DC',
    date: 20200415,
    positive: 2197,
    negative: 9328,
  },
]
const allowedPositiveAnomalies = [
  {
    state: 'RI',
    date: 20200307,
    positive: 2,
    negative: 30,
  },
  {
    state: 'RI',
    date: 20200306,
    positive: 3,
    negative: 17,
  },
  {
    state: 'WY',
    date: 20200410,
    positive: 320,
    negative: 4736,
  },
  {
    state: 'WA',
    date: 20200419,
    positive: 11802,
    negative: 123904,
  },
  {
    state: 'GU',
    date: 20200420,
    positive: 133,
    negative: 991,
  },
]

/**
 * Return true if item is in anomaly array, otherwise false.
 * @param {String} type - the type of anomaly to check.
 * @param {Object} item - the daily object from the api:
 *                        { state, date, positive, negative }
 */
const excludeAnomalies = type => item => {
  const anomaliesArray =
    type === 'positive' ? allowedPositiveAnomalies : allowedNegativeAnomalies
  const { state, date } = item
  const foundAnomaly = anomaliesArray.find(
    a => a.state === state && a.date === date,
  )
  return !foundAnomaly
}

/**
 * Sort objects by date
 * @param {Object} a
 * @param {Object} b
 */
const sortDate = (a, b) => a.date - b.date

describe('API positive cumulative test', () => {
  const aggregatedPositives = uniqueStates.map(state => ({
    state,
    positives: statesDaily
      .filter(d => d.state === state)
      .filter(excludeAnomalies('positive'))
      .sort(sortDate)
      .map(d => (typeof d.positive === 'undefined' ? 0 : d.positive)),
  }))

  const testingData = aggregatedPositives.map(items => [
    items.state,
    [...items.positives],
    items.positives.sort((a, b) => a - b),
  ])

  test.each(testingData)('%s positive data is cumulative', (state, a, b) => {
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})

describe('API negative cumulative test', () => {
  const aggregatedNegatives = uniqueStates.map(state => ({
    state,
    negatives: statesDaily
      .filter(d => d.state === state)
      .filter(excludeAnomalies('negative'))
      .sort(sortDate)
      .map(d => (typeof d.negative === 'undefined' ? 0 : d.negative)),
  }))
  const testingData = aggregatedNegatives.map(items => [
    items.state,
    [...items.negatives],
    items.negatives.sort((a, b) => a - b),
  ])
  test.each(testingData)('%s negative data is cumulative', (state, a, b) => {
    expect(JSON.stringify(a)).toBe(JSON.stringify(b))
  })
})
