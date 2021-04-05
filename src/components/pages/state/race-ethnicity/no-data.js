import React from 'react'

import alertBang from '~images/race-dashboard/alert-bang-orange.svg'

import styles from './no-data.module.scss'

const NoDataPlaceholder = ({ stateName, dataType, metric }) => (
  <div className={styles.noDataContainer}>
    <h3 className={styles.header}>
      <img src={alertBang} alt="" />
      {dataType}
    </h3>
    <p className={styles.content}>
      {stateName} did not report {dataType.toLowerCase()} data for{' '}
      {metric.toLowerCase()} through March 7, 2021.
      <br />
    </p>
  </div>
)

export default NoDataPlaceholder
