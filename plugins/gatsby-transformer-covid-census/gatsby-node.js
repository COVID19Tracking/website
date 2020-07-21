const crypto = require('crypto')
const usPopulation = require('./data/us.json')
const statePopulation = require('./data/states.json')

const onCreateNode = async (
  { node, actions, createNodeId, createContentDigest },
  configOptions,
) => {
  const { createNode, createParentChildLink } = actions
  const { fields, usType, stateType, stateInfoType } = configOptions

  const createPopulationNumbers = population => {
    const digest = crypto
      .createHash('md5')
      .update(node.internal.contentDigest + population)
      .digest('hex')

    const populationNode = {
      id: createNodeId(`${node.id}.population >>> CENSUS`),
      children: [],
      parent: node.id,
      population,
      internal: {
        contentDigest: createContentDigest(digest),
        type: 'population',
      },
    }
    fields.forEach(field => {
      if (typeof node[field] === 'undefined') {
        return
      }
      populationNode[field] = {
        per100k: node[field] && (node[field] / population) * 100000,
        per10k: node[field] && (node[field] / population) * 10000,
        displayPercent: node[field] && (node[field] / population) * 100,
        percent: node[field] && node[field] / population,
      }
    })

    createNode(populationNode)
    createParentChildLink({ parent: node, child: populationNode })
  }

  if (node.internal.type === usType) {
    createPopulationNumbers(usPopulation.population)
    return
  }

  if (node.internal.type === stateType) {
    const state = statePopulation.find(state => state.state === node.state)
    if (!state) {
      return
    }
    createPopulationNumbers(state.population)
  }

  if (node.internal.type === stateInfoType) {
    const state = statePopulation.find(state => state.state === node.state)
    if (!state) {
      return
    }
    createPopulationNumbers(state.population)
  }
  return null
}

exports.onCreateNode = onCreateNode
