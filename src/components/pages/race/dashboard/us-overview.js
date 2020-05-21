import React from 'react'
import UsReportingCount from './us-reporting-count'
import StatesNotReporting from './states-not-reporting'
import UsOverviewStyles from './us-overview.module.scss'
import { SyncInfobox } from '~components/common/infobox'

export default ({
  statesCasesCount,
  statesDeathsCount,
  statesNotReporting,
}) => (
  <div className={UsOverviewStyles.container}>
    <h2>How many states report race and ethnicity data?</h2>
    <div className={UsOverviewStyles.row}>
      <UsReportingCount
        statesCasesCount={statesCasesCount}
        statesDeathsCount={statesDeathsCount}
        className={UsOverviewStyles.reportingCount}
      />
      <div>
        <StatesNotReporting content={statesNotReporting} />
      </div>
    </div>
    <SyncInfobox />
  </div>
)
