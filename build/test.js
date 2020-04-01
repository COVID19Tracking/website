const { fetchSave } = require('./handlers')
// const resources = require('./datasources')
const statesDaily = require('./datasources/statesDaily')

// Test a single resouce.
fetchSave(statesDaily)
