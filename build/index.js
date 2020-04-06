const util = require('util')
// const _ = require('lodash/fp')
const { forEachP } = require('understory')
const { fetchSave } = require('./handlers')
const resources = require('./datasources')

// Send each resouce to fetchSave(). Waits for promise to resolve before sending next one.

function exitError(err) {
  console.error(
    `\u001b[${util.inspect.colors.red[0]}mAPI ERROR\n${err}\u001b[${util.inspect.colors.red[1]}m`,
  )
  process.exit(1)
}

forEachP(fetchSave, resources).catch(exitError)
