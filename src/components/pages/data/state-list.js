import React from 'react'
import State from './state-data'
import stateListStyles from './state-list.module.scss'

export default ({ states, stateData }) => {
  const stateList = []
  states.forEach(node => {
    const state = node
    stateData.forEach(data => {
      if (data.state === state.state) {
        state.stateData = data
      }
    })
    stateList.push(state)
  })

  return stateList.map(state => (
    <div
      key={state}
      id={`state-list-${state.state}`}
      className={stateListStyles.item}
    >
      <State state={state} stateData={state.stateData} />
    </div>
  ))
}
