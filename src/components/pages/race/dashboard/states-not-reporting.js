import React from 'react'
import alertBang from '../../../../images/race-dashboard/alert-bang-orange.svg'
import statesNotReportingStyles from './states-not-reporting.module.scss'

export default ({ content }) => (
  <div className={statesNotReportingStyles.container}>
    <div className={statesNotReportingStyles.iconContainer}>
      <img src={alertBang} alt="Alert icon" />
    </div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)
