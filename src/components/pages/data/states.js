import React from 'react'
import State from './state-data'
import StateNavWrapper from './state-nav-wrapper'
import statesStyles from './states.module.scss'

const States = ({
  states,
  stateData,
  sevenDaysAgoList,
  stateMetadata,
  annotations,
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
    state.annotations = annotations.filter(
      annotation => annotation.state && annotation.state === state.state,
    )
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

export default States
