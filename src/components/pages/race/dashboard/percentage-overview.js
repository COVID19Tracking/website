import React from 'react'
import percentageOverview from './percentage-overview.module.scss'
import alertBang from '~images/race-dashboard/alert-bang-orange.svg'

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

const capitalizeString = s => s.charAt(0).toUpperCase() + s.slice(1)

export default ({
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
      <h3 className={percentageOverview.title}>
        {capitalizeString(dataType)} completeness for {stateName}:
      </h3>
      <div className={percentageOverview.data}>
        <div className={percentageOverview.dataItem}>
          <p>
            <PercentContent percent={Math.round((1 - casePercent) * 100)} />{' '}
            <span className="a11y-only">of</span>{' '}
            <span className={percentageOverview.percentCaption}>
              Cases have no {dataType} data
            </span>
          </p>
        </div>
        <div className={percentageOverview.dataItem}>
          <p>
            <PercentContent percent={Math.round((1 - deathPercent) * 100)} />{' '}
            <span className="a11y-only">of</span>{' '}
            <span className={percentageOverview.percentCaption}>
              Deaths have no {dataType} data
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
