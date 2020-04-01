// const _ = require('lodash/fp')
const { forEachP } = require('understory')
const { fetchSave } = require('./handlers')
const resources = require('./datasources')

// Send each resouce to fetchSave(). Waits for promise to resolve before sending next one.
forEachP(fetchSave, resources).catch(console.error)
