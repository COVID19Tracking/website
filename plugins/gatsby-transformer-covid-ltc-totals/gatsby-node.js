const crypto = require('crypto')
const fs = require('fs-extra')

const ltcFacilities = fs.readJsonSync('./_data/long_term_care_facilities.json')
const ltcStates = fs.readJsonSync('./_data/long_term_care_states_complete.json')

const stateFacilities = {}
const stateCurrent = {}

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
  if (
    state.data_type === 'Aggregate' &&
    (typeof stateCurrent[state.state_abbr.toLowerCase()] === 'undefined' ||
      stateCurrent[state.state_abbr.toLowerCase()].date < state.date)
  ) {
    stateCurrent[state.state_abbr.toLowerCase()] = state
  }
})

const dataDigest = crypto
  .createHash('md5')
  .update(JSON.stringify(stateFacilities) + JSON.stringify(stateCurrent))
  .digest('hex')
const onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createParentChildLink } = actions
  const { type } = configOptions

  if (node.internal.type === type) {
    const digest = crypto
      .createHash('md5')
      .update(`${node.internal.contentDigest}-${dataDigest}`)
      .digest('hex')

    const ltcNode = {
      id: createNodeId(`${node.id}.ltc >>> LTC`),
      children: [],
      parent: node.id,
      facilities:
        typeof stateFacilities[node.state.toLowerCase()] !== 'undefined'
          ? stateFacilities[node.state.toLowerCase()].length
          : 0,
      current:
        typeof stateCurrent[node.state.toLowerCase()] !== 'undefined' &&
        stateCurrent[node.state.toLowerCase()],
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
