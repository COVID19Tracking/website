const { cdcTests, counties, press } = require('./sheets')
const statesDaily = require('./statesDaily')
const statesInfo = require('./statesInfo')
const usCurrent = require('./usCurrent')
const usDaily = require('./usDaily')
const { grade, states } = require('./states')
const urls = require('./urls')
const staticFiles = require('./staticFiles')
const screenshots = require('./screenshots')

const resources = [
  cdcTests,
  counties,
  press,
  screenshots,
  states, // States Current
  statesDaily,
  statesInfo,
  grade,
  urls,
  usCurrent,
  usDaily,
  staticFiles,
]

module.exports = resources
