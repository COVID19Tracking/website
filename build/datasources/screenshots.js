const _ = require('lodash/fp')
const { isGt } = require('understory')
const {
  mergeFieldsWith,
  move,
  propDo,
  setField,
  setFieldWith,
} = require('prairie')
const { screenshotDate, toDailyDate } = require('./utils')
const getXml = require('../handlers/xml')

const isScreenshot = _.overEvery([
  propDo('Key', _.startsWith('state_screenshots/')),
  propDo('Key', _.negate(_.includes('public'))),
  propDo('Size', isGt(0)),
])

const addUrl = setField(
  'url',
  ({ state, filename }) =>
    `https://covidtracking.com/screenshots/${state}/${filename}`,
)

const addDate = mergeFieldsWith(
  'filename',
  _.flow(
    _.split('-'), // state-date-time.png
    parts => {
      const secondary = parts[1] === 'secondary'
      const filename = secondary ? parts[2] + parts[3] : parts[1] + parts[2]
      const dateStr = filename.split('.')[0]
      return {
        dateChecked: screenshotDate(dateStr),
        secondary,
      }
    },
  ),
)

const fixItem = _.flow(
  mergeFieldsWith(
    'Key',
    _.flow(
      _.split('/'),
      _.tail,
      _.zipObject(['state', 'filename']),
      addUrl,
      addDate,
    ),
  ),
  setFieldWith('date', 'dateChecked', toDailyDate),
  _.omit(['ETag', 'StorageClass', 'Key', 'LastModified', 'filename']),
  move('Size', 'size'),
)

const getItems = _.get('ListBucketResult.Contents')
const fixItems = _.flow(getItems, _.filter(isScreenshot), _.map(fixItem))

function getPage(marker) {
  const baseUrl = 'https://covid-data-archive.s3.us-east-2.amazonaws.com/'
  const url = `${baseUrl}?prefix=state_screenshots/&marker=${marker || ''}`
  console.log(url)
  return getXml({ url })
}
const hasMore = _.get('ListBucketResult.IsTruncated')
const getMarker = _.flow(getItems, _.last, _.get('Key'))

async function getPages(previousItems = [], marker) {
  const result = await getPage(marker)
  const items = previousItems.concat(fixItems(result))
  return hasMore(result) ? getPages(items, getMarker(result)) : items
}

const dateStatePages = value => ({
  path: `states/${value[0].state}/${value[0].date}/screenshots`,
  value,
})
// dateChecked
const datePages = _.flow(_.groupBy('date'), _.map(dateStatePages))

const statePages = _.flow(
  _.groupBy('state'),
  _.flatMap(value => [
    { path: `states/${value[0].state}/screenshots`, value },
    { path: `states/${value[0].state.toLowerCase()}/screenshots`, value },
    ...datePages(value),
  ]),
)

function createPages(value) {
  return [
    { path: 'states/screenshots', value: _.groupBy('state', value) },
    ...statePages(value),
  ]
}

module.exports = {
  fetch: () => getPages(),
  createPages,
}
