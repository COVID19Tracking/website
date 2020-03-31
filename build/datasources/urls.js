const _ = require('lodash/fp')
const { setFieldWith } = require('prairie')
const { codeByName } = require('./stateNames')

const urls = {
  app: 'yaml',
  url: 'https://raw.githubusercontent.com/COVID19Tracking/covid-tracking/master/urls.yaml',
  fixItems: _.map(setFieldWith('stateId', 'name', codeByName)),
  multi: true,
  args: { json: true }, // Duplicate keys will override values rather than throwing an error.
}

module.exports = urls
