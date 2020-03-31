// const _ = require('lodash/fp')
const { forEachP } = require('understory')
const handler = require('./handlers')
const resources = require('./datasources')

// forEachP(handler, resources).catch(console.error)
handler(resources[3])
