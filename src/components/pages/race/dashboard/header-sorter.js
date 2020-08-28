import React from 'react'
import headerSorterStyles from './header-sorter.module.scss'

const HeaderSorter = ({ stateName, stateReports }) => (
  // stateReports like: 'race' or 'ethnicity' or 'race/ethnicity'
  <div className={headerSorterStyles.container}>
    <p>
      The following tables reflect only those cases and deaths where{' '}
      {stateReports} is known and reported by {stateName}. If this state&#8217;s
      reporting percentages are low, interpret with caution.
    </p>
  </div>
)

export default HeaderSorter
