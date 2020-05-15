import React from 'react'
import headerSorterStyles from './header-sorter.module.scss'

export default ({ stateName, stateReports }) => (
  // stateReports like: 'race' or 'ethnicity' or 'race/ethnicity'
  <div className={headerSorterStyles.container}>
    <p>
      The following charts show only those cases and deaths where {stateReports}{' '}
      is known. If {stateName} reporting levels are low, the percentage of cases
      or deaths for each group may not be suitable for comparison with
      population.
    </p>
  </div>
)
