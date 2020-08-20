import React from 'react'
import alertBang from '~images/race-dashboard/alert-bang-orange.svg'


export default ({ content }) => (
  <div className={statesNotReportingStyles.container}>
    <div className={statesNotReportingStyles.iconContainer}>
      <img src={alertBang} alt="Alert icon" />
    </div>
)
