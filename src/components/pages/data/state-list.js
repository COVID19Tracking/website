import React from 'react'
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

  return stateList.map(state => (
    <div key={state} id={`state-list-${state.state}`} className="module">
      <State state={state} stateData={state.stateData} />
    </div>
  ))
}
