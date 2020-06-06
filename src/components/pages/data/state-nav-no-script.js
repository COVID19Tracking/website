import React from 'react'
import stateNavNoJsStyle from './state-nav-no-js.module.scss'

export default ({ stateList }) => (
  <>
    <div
      className={`js-disabled js-disabled-block state-nav-no-js ${stateNavNoJsStyle.stateNav}`}
    >
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
