import React from 'react'
import { Link } from 'gatsby'
import { Box } from '../../common/flexbox'
import stateNavNoJsStyle from './state-nav-no-js.module.scss'

export default ({ stateList }) => (
  <>
    <noscript>
      <style>{`
    .state-nav-no-js {
      display: block !important;
    }
    `}</style>
    </noscript>
    <Box
      width={[1, 1, 1, 1 / 2]}
      className={`state-nav-no-js ${stateNavNoJsStyle.stateNav}`}
      m="0 auto 1rem"
    >
      <h3>Jump to a state:</h3>
      <ul>
        {stateList.map(state => (
          <li key={state.node.state}>
            <Link to={`/data#state-${state.node.state}`}>
              {state.node.state}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  </>
)
