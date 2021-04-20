const crypto = require('crypto')
const fs = require('fs-extra')
const getTotals = require('../../src/utilities/ltc-totals')
const ltcFacilities = fs.readJsonSync('./_data/long_term_care_facilities.json')
const ltcStates = fs.readJsonSync('./_data/long_term_care_states_v3.json')

const stateFacilities = {}
const stateCurrent = {}
const stateLast = {}

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
  const { totalCases, totalDeath } = getTotals(stateCurrent[state])
  stateCurrent[state] = {
    ...stateCurrent[state],
    total_cases: totalCases,
    total_death: totalDeath,
  }
})

Object.keys(stateLast).forEach(state => {
  const { totalCases, totalDeath } = getTotals(stateLast[state])
  stateLast[state] = {
    ...stateLast[state],
    total_cases: totalCases,
    total_death: totalDeath,
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
          : null,
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
