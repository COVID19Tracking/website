import React from 'react'
import headerSorterStyles from '~components/pages/race/dashboard/header-sorter.module.scss'

export default ({ stateName, stateReports }) => (
  // stateReports like: 'race' or 'ethnicity' or 'race/ethnicity'
  <div className={headerSorterStyles.container}>
    <p>
      The following tables reflect only those cases and deaths where{' '}
      {stateReports} is known and reported by {stateName}. If this state&apos;s
      reporting percentages are low, interpret with caution.
    </p>
  </div>
)
