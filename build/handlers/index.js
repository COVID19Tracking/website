const _ = require('lodash/fp')
const { getSheet } = require('./sheets')
const getXml = require('./xml')
const getYaml = require('./yaml')
const { getJson } = require('./fetch')
const { saveAll } = require('./save')

const handlers = {
  json: getJson,
  sheets: getSheet,
  xml: getXml,
  yaml: getYaml,
}

function processResult(fixItems, oldValue) {
  if (!_.isFunction(fixItems)) return _.identity
  return newValue => fixItems(newValue, oldValue)
}
function defaultPage(path) {
  return value => [
    {
      path,
      value,
    },
  ]
}
const handleResponse = ({ fixItems, createPages, path }) =>
  _.flow(processResult(fixItems), createPages || defaultPage(path), saveAll)

function handleRequest(resource) {
  const { app, fetch } = resource
  const handler = fetch || handlers[app]
  if (!_.isFunction(handler))
    throw new Error(`Handler not found: ${resource.app}`)
  return handler(resource).then(handleResponse(resource))
}

module.exports = handleRequest
