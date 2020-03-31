// const _ = require('lodash/fp')
const handler = require('./handlers')
const resources = require('./datasources')

// _.forEach(handler, resources)

handler(resources[0]).catch(console.error)
