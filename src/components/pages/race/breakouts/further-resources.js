import React from 'react'
import { Link } from 'gatsby'

const FurtherResources = ({ vaccineSources, stateName, stateSlug }) => {
  const vaccineSourceList = vaccineSources.includes('\n')
    ? vaccineSources.split('\n')
    : [vaccineSources]
  return (
    <ul>
      <li>
        <Link to="/race/dashboard">Racial data state dashboard</Link>
      </li>
      <li>
        <Link to={`/data/state/${stateSlug}`}>All data for Alabama</Link>
      </li>
      {vaccineSources && vaccineSourceList.length > 1 && (
        <li>
          {stateName}’s official vaccine tracker
          <ul>
            {vaccineSourceList.map((source, index) => (
              <li key={source}>
                <a href={source}>Source {index + 1}</a>
              </li>
            ))}
          </ul>
        </li>
      )}
      {vaccineSources && vaccineSourceList.length === 1 && (
        <li>
          <a href={vaccineSourceList[0]}>
            {stateName}’s official vaccine tracker
          </a>
        </li>
      )}
    </ul>
  )
}
export default FurtherResources
