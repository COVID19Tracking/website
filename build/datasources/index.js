const {
  cdcTests,
  counties,
  press,
  statesInfo,
  usCurrent,
  usDaily,
} = require('./sheets')
const statesDaily = require('./statesDaily')
const { grade, states } = require('./states')
const urls = require('./urls')
const { statesPop } = require('./census')
const screenshots = require('./screenshots')

const resources = [
  cdcTests,
  counties,
  press,
  screenshots,
  states,
  statesDaily,
  // statesInfo,
  grade,
  // statesPop,
  // urls,
  // usCurrent,
  // usDaily,
]

module.exports = resources
