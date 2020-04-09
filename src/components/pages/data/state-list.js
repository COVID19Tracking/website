import React from 'react'
import { Flex, Box } from '../../common/flexbox'
import State from './state-data'

export default ({ states, stateData, populationData }) => {
  const stateList = []
  states.forEach(({ node }) => {
    const state = node
    stateData.forEach(data => {
      if (data.node.state === state.state) {
        state.stateData = data.node
      }
    })
    populationData.forEach(data => {
      if (data.node.state === state.state) {
        state.population = data.node.population
      }
    })
    stateList.push(state)
  })
  return (
    <Flex flexWrap="wrap" m="0 -10px">
      {stateList.map(state => (
        <Box width={1} mb={['1rem', '50px']} p="0 10px" className="data-state">
          <State state={state} stateData={state.stateData} />
        </Box>
      ))}
    </Flex>
  )
}
