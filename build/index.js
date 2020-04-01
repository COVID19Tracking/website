// const _ = require('lodash/fp')
const { forEachP } = require('understory')
const { fetchSave } = require('./handlers')
const resources = require('./datasources')

forEachP(fetchSave, resources).catch(console.error)
// fetchSave(resources[11])
