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

const Base = ({ stateName, dataType, casePercent, deathPercent }) => (
  <div>
    <h3 className={percentageOverview.title}>
      {stateName} has reported {dataType} data for:
    </h3>
    <div className={percentageOverview.data}>
      <div>
        <p>
          <PercentContent percent={Math.round(casePercent)} />
          <br />
          <span className={percentageOverview.percentCaption}>Cases</span>
        </p>
      </div>
      <div>
        <p>
          <PercentContent percent={Math.round(deathPercent)} />
          <br />
          <span className={percentageOverview.percentCaption}>Deaths</span>
        </p>
      </div>
    </div>
  </div>
)

export default ({
  stateName,
  ethnicityCasePercent,
  ethnicityDeathPercent,
  raceCasePercent,
  raceDeathPercent,
  combinedRaceEthnicityCasePercent,
  combinedRaceEthnicityDeathPercent,
}) => {
  if (
    [
      ethnicityCasePercent,
      ethnicityDeathPercent,
      raceCasePercent,
      raceDeathPercent,
      combinedRaceEthnicityCasePercent,
      combinedRaceEthnicityDeathPercent,
    ].every(prop => prop === undefined)
  ) {
    // if every race/ethnicity stat is undefined, return nothing
    return <></>
  }
  if (combinedRaceEthnicityDeathPercent || combinedRaceEthnicityCasePercent) {
    return (
      <div className={percentageOverview.container}>
        <Base
          stateName={stateName}
          dataType="racial and ethnicity"
          casePercent={combinedRaceEthnicityCasePercent}
          deathPercent={combinedRaceEthnicityDeathPercent}
        />
      </div>
    )
  }
  return (
    <div className={percentageOverview.container}>
      <Base
        stateName={stateName}
        dataType="racial"
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
}
