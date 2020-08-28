import React from 'react'
import UsReportingCount from './us-reporting-count'
import UsOverviewStyles from './us-overview.module.scss'

const UsOverview = ({ statesCasesCount, statesDeathsCount }) => (
  <div className={UsOverviewStyles.container}>
    <h2>How many states report race and ethnicity data?</h2>
    <div className={UsOverviewStyles.row}>
      <UsReportingCount
        statesCasesCount={statesCasesCount}
        statesDeathsCount={statesDeathsCount}
        className={UsOverviewStyles.reportingCount}
      />
    </div>
  </div>
)

export default UsOverview
