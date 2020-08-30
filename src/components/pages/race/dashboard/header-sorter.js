import React from 'react'
import headerSorterStyles from './header-sorter.module.scss'

export default ({ stateReports }) => (
  // stateReports like: 'race' or 'ethnicity' or 'race/ethnicity'
  <div className={headerSorterStyles.container}>
    <p>
      States that have 10% or more missing {stateReports} data should be
      interpreted with caution.
    </p>
  </div>
)
