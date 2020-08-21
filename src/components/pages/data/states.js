import React from 'react'
import State from './state-data'
import StateNavWrapper from './state-nav-wrapper'
import statesStyles from './states.module.scss'

export default ({
  states,
  stateData,
  sevenDaysAgoList,
  stateMetadata,
  longTermCare,
}) => {
  const stateList = []
  states.forEach(node => {
    const state = node
    stateData.forEach(data => {
      if (data.state === state.state) {
        state.stateData = data
      }
    })
    sevenDaysAgoList.forEach(data => {
      if (state.state === data.state) {
        state.sevenDaysAgo = data
      }
    })
    const stateLongTermCare = longTermCare.find(
      group => group.nodes[0].State_Abbr === state.state,
    )
    state.longTermCare = stateLongTermCare ? stateLongTermCare.nodes[0] : false
    stateList.push(state)
  })

  return (
    <StateNavWrapper stateList={stateList}>
      {stateList.map(state => (
        <div
          key={`state-list-${state.state}`}
          id={`state-list-${state.state}`}
          className={statesStyles.item}
        >
          <State
            state={state}
            stateData={state.stateData}
            metadata={stateMetadata.find(item => item.code === state.state)}
          />
        </div>
      ))}
    </StateNavWrapper>
  )
}
