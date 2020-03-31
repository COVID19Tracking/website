const _ = require('lodash/fp')
const { getSheet } = require('./sheets')
const getXml = require('./xml')
const getYaml = require('./yaml')
const { getJson } = require('./fetch')
const saveAll = require('./save')

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

const handleResponse = ({ fixItems, serialize }) =>
  _.flow(processResult(fixItems), serialize, saveAll)

function handleRequest(resource) {
  const { app } = resource
  const handler = handlers[app]
  if (!_.isFunction(handler)) throw new Error(`Handler not found: ${app}`)
  return handler(resource).then(handleResponse(resource))
}

module.exports = handleRequest
