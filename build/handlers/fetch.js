const _ = require('lodash/fp')
const fetch = require('node-fetch')

const fetchJson = url =>
  fetch(url, { cf: { cacheEverything: true, cacheTtl: 120 } }).then(res =>
    res.json(),
  )

const getJson = _.flow(_.get('url'), fetchJson)

const fetchXml = url =>
  fetch(url, {
    cf: { cacheEverything: true, cacheTtl: 300 },
    headers: { Accept: 'text/xml' },
  }).then(response => response.text())

const fetchYaml = url =>
  fetch(url, {
    cf: { cacheEverything: true, cacheTtl: 120 },
    headers: { Accept: 'application/x-yaml, text/yaml, text/html' },
  }).then(response => response.text())

function rejectError(x) {
  return x.error ? Promise.reject(x) : x
}
module.exports = {
  fetchJson,
  fetchXml,
  fetchYaml,
  getJson,
  rejectError,
}
