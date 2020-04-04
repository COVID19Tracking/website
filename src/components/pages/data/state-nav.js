import React from 'react'
import { Link } from 'gatsby'
import { Box } from '../../common/flexbox'

export default ({ stateList }) => (
  <Box width={[1, 1, 1, 1 / 2]} className="state-nav" m="0 auto 1rem">
    <h3>Jump to a state:</h3>
    <ul>
      {stateList.map(state => (
        <li key={state.node.state}>
          <Link to={`/data#state-${state.node.state}`}>{state.node.state}</Link>
        </li>
      ))}
    </ul>
  </Box>
)
