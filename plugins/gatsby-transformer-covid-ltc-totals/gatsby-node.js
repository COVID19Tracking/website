const crypto = require('crypto')
const fs = require('fs-extra')

const ltcFacilities = fs.readJsonSync('./_data/long_term_care_facilities.json')
const ltcStates = fs.readJsonSync('./_data/long_term_care_states_complete.json')

const stateFacilities = {}
const stateCurrent = {}
const stateLast = {}

const getTotals = state => {
  let total_cases = 0
  let total_death = 0
  Object.keys(state).forEach(key => {
    if (key.search(/posres|posstaff/) > -1) {
      total_cases += state[key]
    }
    if (key.search(/deathres|deathstaff/) > -1) {
      total_death += state[key]
    }
  })
  return { total_cases, total_death }
}

ltcFacilities.forEach(facility => {
  if (typeof stateFacilities[facility.state.toLowerCase()] === 'undefined') {
    stateFacilities[facility.state.toLowerCase()] = []
  }
  if (
    stateFacilities[facility.state.toLowerCase()].indexOf(
      facility.facility_name,
    ) === -1
  ) {
    stateFacilities[facility.state.toLowerCase()].push(facility.facility_name)
  }
})

ltcStates.forEach(state => {
  const stateCode = state.state_abbr.toLowerCase()
  if (
    state.data_type === 'Aggregate' &&
    (typeof stateCurrent[stateCode] === 'undefined' ||
      stateCurrent[stateCode].date < state.date)
  ) {
    stateCurrent[stateCode] = state
  }
})

ltcStates.forEach(state => {
  const stateCode = state.state_abbr.toLowerCase()
  if (
    state.data_type === 'Aggregate' &&
    (typeof stateLast[stateCode] === 'undefined' ||
      (stateLast[stateCode].date < state.date &&
        stateCurrent[stateCode].date > state.date))
  ) {
    stateLast[stateCode] = state
  }
})

Object.keys(stateCurrent).forEach(state => {
  stateCurrent[state] = {
    ...stateCurrent[state],
    ...getTotals(stateCurrent[state]),
  }
})

Object.keys(stateLast).forEach(state => {
  stateLast[state] = {
    ...stateLast[state],
    ...getTotals(stateLast[state]),
  }
})

const dataDigest = crypto
  .createHash('md5')
  .update(
    JSON.stringify(stateFacilities) +
      JSON.stringify(stateCurrent) +
      JSON.stringify(stateLast),
  )
  .digest('hex')
const onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createParentChildLink } = actions
  const { type } = configOptions

  if (node.internal.type === type) {
    const stateCode = node.state.toLowerCase()
    const digest = crypto
      .createHash('md5')
      .update(`${node.internal.contentDigest}-${dataDigest}`)
      .digest('hex')

    const ltcNode = {
      id: createNodeId(`${node.id}.ltc >>> LTC`),
      children: [],
      parent: node.id,
      facilities:
        typeof stateFacilities[stateCode] !== 'undefined'
          ? stateFacilities[stateCode].length
          : 0,
      current:
        typeof stateCurrent[stateCode] !== 'undefined' &&
        stateCurrent[stateCode],
      last: typeof stateLast[stateCode] !== 'undefined' && stateLast[stateCode],
      internal: {
        contentDigest: createContentDigest(digest),
        type: 'ltc',
      },
    }

    createNode(ltcNode)
    createParentChildLink({ parent: node, child: ltcNode })
  }
}

exports.onCreateNode = onCreateNode
