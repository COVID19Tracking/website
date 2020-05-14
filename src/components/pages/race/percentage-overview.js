import React from 'react'
import percentageOverview from './percentage-overview.module.scss'
// import alertBang from '../../../images/alert-bang.svg'

const Base = ({ stateName, dataType, casePercent, deathPercent }) => {
  return (
    <div>
      <h3 className={percentageOverview.title}>
        {stateName} has reported {dataType} data for:
      </h3>
      <div className={percentageOverview.data}>
        <div>
          <p>
            <span className={percentageOverview.percent}>
              {Math.round(casePercent)}%
            </span>
            <br />
            <span className={percentageOverview.percentCaption}>Cases</span>
          </p>
        </div>
        <div>
          <p>
            <span className={percentageOverview.percent}>
              {Math.round(deathPercent)}%
            </span>
            <br />
            <span className={percentageOverview.percentCaption}>Deaths</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ({
  stateName,
  ethnicityCasePercent,
  ethnicityDeathPercent,
  raceCasePercent,
  raceDeathPercent,
}) => (
  <div className={percentageOverview.container}>
    <Base
      stateName={stateName}
      dataType="race"
      casePercent={raceCasePercent}
      deathPercent={raceDeathPercent}
    />
    <Base
      stateName={stateName}
      dataType="ethnicity"
      casePercent={ethnicityCasePercent}
      deathPercent={ethnicityDeathPercent}
    />
  </div>
)
