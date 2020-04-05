import React from 'react'
import { Flex, Box } from '../../common/flexbox'
import State from './state-data'

export default ({ states, stateData }) => {
  const stateList = []
  states.forEach(({ node }) => {
    const state = node
    stateData.forEach(data => {
      if (data.node.state === state.state) {
        state.stateData = data.node
      }
    })
    stateList.push(state)
  })
  return (
    <Flex flexWrap="wrap" m="0 -10px">
      {stateList.map(state => (
        <Box
          width={1}
          mb={['1rem', '1.5rem']}
          p="0 10px"
          className="data-state"
        >
          <State state={state} stateData={state.stateData} />
        </Box>
      ))}
    </Flex>
  )
}
