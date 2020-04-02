const { cdcTests, counties, press, statesInfo } = require('./sheets')
const statesDaily = require('./statesDaily')
const usCurrent = require('./usCurrent')
const usDaily = require('./usDaily')
const { grade, states } = require('./states')
const urls = require('./urls')
// const { statesPop } = require('./census')
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
  // statesPop, This needs to be static.
  urls,
  usCurrent,
  usDaily,
]

module.exports = resources
