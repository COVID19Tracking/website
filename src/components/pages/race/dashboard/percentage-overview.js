import React from 'react'
import alertBang from '~images/race-dashboard/alert-bang-orange.svg'
import percentageOverviewStyle from './percentage-overview.module.scss'

const PercentContent = ({ percent }) => {
  if (percent) {
    return (
      <span className={percentageOverviewStyle.percent}>
        {Math.round(percent)}%
      </span>
    )
  }
  return (
    <span className={percentageOverviewStyle.percent}>
      <img src={alertBang} alt="Alert icon" />
    </span>
  )
}

const PercentageOverview = ({
  stateName,
  dataType,
  casePercent,
  deathPercent,
  className,
}) => {
  if (casePercent === undefined && deathPercent === undefined) {
    return null
  }
  return (
    <div className={className || ''}>
      <h3 className={percentageOverviewStyle.title}>
        {stateName} has reported {dataType} data for:
      </h3>
      <div className={percentageOverviewStyle.data}>
        <div className={percentageOverviewStyle.dataItem}>
          <p>
            <PercentContent percent={Math.round(casePercent * 100)} />{' '}
            <span className="a11y-only">of</span>{' '}
            <span className={percentageOverviewStyle.percentCaption}>
              Cases
            </span>
          </p>
        </div>
        <div className={percentageOverviewStyle.dataItem}>
          <p>
            <PercentContent percent={Math.round(deathPercent * 100)} />{' '}
            <span className="a11y-only">of</span>{' '}
            <span className={percentageOverviewStyle.percentCaption}>
              Deaths
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PercentageOverview
