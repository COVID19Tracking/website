import React from 'react'
import percentageOverview from './percentage-overview.module.scss'
import alertBang from '../../../../images/race-dashboard/alert-bang-orange.svg'

const PercentContent = ({ percent }) => {
  if (percent) {
    return (
      <span className={percentageOverview.percent}>{Math.round(percent)}%</span>
    )
  }
  return (
    <span className={percentageOverview.percent}>
      <img src={alertBang} alt="Alert icon" />
    </span>
  )
}

export default ({ stateName, dataType, casePercent, deathPercent }) => {
  if (casePercent === undefined && deathPercent === undefined) {
    return null
  }
  return (
    <div>
      <h3 className={percentageOverview.title}>
        {stateName} has reported {dataType} data for:
      </h3>
      <div className={percentageOverview.data}>
        <div>
          <p>
            <PercentContent percent={Math.round(casePercent * 100)} />
            <br />
            <span className={percentageOverview.percentCaption}>Cases</span>
          </p>
        </div>
        <div>
          <p>
            <PercentContent percent={Math.round(deathPercent * 100)} />
            <br />
            <span className={percentageOverview.percentCaption}>Deaths</span>
          </p>
        </div>
      </div>
    </div>
  )
}
