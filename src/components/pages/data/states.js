import React from 'react'
import State from './state-data'
import StateNav from './state-nav'
import statesStyles from './states.module.scss'

export default ({ states, stateData, sevenDaysAgoList }) => {
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
    stateList.push(state)
  })

  return (
    <div className={statesStyles.headerContainer}>
      <div className={statesStyles.states}>
        <h2 className={statesStyles.title}>Data by State</h2>
        <div className={statesStyles.statesWrapper}>
          {stateList.map(state => (
            <div
              key={`state-list-${state.state}`}
              id={`state-list-${state.state}`}
              className={statesStyles.item}
            >
              <State state={state} stateData={state.stateData} />
            </div>
          ))}
        </div>
      </div>
      <StateNav stateList={stateList} className={statesStyles.sidebar} />
    </div>
  )
}
