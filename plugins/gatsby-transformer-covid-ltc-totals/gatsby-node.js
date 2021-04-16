const crypto = require('crypto')
const fs = require('fs-extra')

const ltcFacilities = fs.readJsonSync('./_data/long_term_care_facilities.json')
const ltcStates = fs.readJsonSync('./_data/long_term_care_states_v3.json')

const stateFacilities = {}
const stateCurrent = {}
const stateLast = {}
const categories = ['nh', 'alf', 'lumpedother']

const getTotals = state => {
  let total_cases = null
  let total_death = null
  categories.forEach(category => {
    if (
      state[`posresstaff_${category}`] ||
      state[`probposresstaff_${category}`]
    ) {
      total_cases +=
        state[`posresstaff_${category}`] + state[`probposresstaff_${category}`]
    } else {
      total_cases +=
        state[`posres_${category}`] +
        state[`probposres_${category}`] +
        state[`posstaff_${category}`] +
        state[`probposstaff_${category}`]
    }
    if (
      state[`deathresstaff_${category}`] ||
      state[`probdeathresstaff_${category}`]
    ) {
      total_death +=
        state[`deathresstaff_${category}`] +
        state[`probdeathresstaff_${category}`]
    } else {
      total_death +=
        state[`deathres_${category}`] +
        state[`probdeathres_${category}`] +
        state[`deathstaff_${category}`] +
        state[`probdeathstaff_${category}`]
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
