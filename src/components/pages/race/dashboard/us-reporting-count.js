import React from 'react'
import percentageOverviewStyles from './percentage-overview.module.scss'

export default ({ statesCasesCount, statesDeathsCount, className }) => (
  <div className={className}>
    <div className={percentageOverviewStyles.data}>
      <div>
        <h3 className={percentageOverviewStyles.title}>
          Race/ethnicity data for cases:
        </h3>
        <p>
          <span className={percentageOverviewStyles.percent}>
            {statesCasesCount}
          </span>{' '}
          <br />
          <span className={percentageOverviewStyles.percentCaption}>
            of 56 states & territories
          </span>
        </p>
      </div>
      <div>
        <h3 className={percentageOverviewStyles.title}>
          Race/ethnicity for deaths:
        </h3>
        <p>
          <span className={percentageOverviewStyles.percent}>
            {statesDeathsCount}{' '}
          </span>
          <br />
          <span className={percentageOverviewStyles.percentCaption}>
            of 56 states & territories
          </span>
        </p>
      </div>
    </div>
  </div>
)
