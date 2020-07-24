import React from 'react'
import stateNavStyle from './state-nav.module.scss'

export default ({ stateList }) => (
  <>
    <div className={stateNavStyle.stateNav}>
      <h3>Jump to a state:</h3>
      <ul>
        {stateList.map(state => (
          <li key={state.state}>
            <a href={`#state-${state.state.toLowerCase()}`}>{state.state}</a>
          </li>
        ))}
      </ul>
    </div>
  </>
)
