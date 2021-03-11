import React from 'react'
import { Link } from 'gatsby'

const FurtherResources = ({ vaccineLink, stateName, stateSlug }) => (
  <ul>
    <li>
      <Link to="/race/dashboard">Racial data state dashboard</Link>
    </li>
    <li>
      <Link to={`/data/state/${stateSlug}`}>All data for Alabama</Link>
    </li>
    {vaccineLink && (
      <li>
        <a href={vaccineLink}>{stateName}’s official vaccine tracker</a>
      </li>
    )}
  </ul>
)

export default FurtherResources
