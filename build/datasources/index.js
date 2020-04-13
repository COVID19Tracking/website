const { cdcTests, counties, press } = require('./sheets')
const statesDaily = require('./statesDaily')
const statesInfo = require('./statesInfo')
const usCurrent = require('./usCurrent')
const usDaily = require('./usDaily')
const { grade, states } = require('./states')
const urls = require('./urls')
// const { statesPop } = require('./census')
const screenshots = require('./screenshots')
const volunteers = require('./volunteers')

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
  volunteers,
]


module.exports = resources
