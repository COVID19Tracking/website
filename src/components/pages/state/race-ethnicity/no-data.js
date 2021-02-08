import React from 'react'
import { Link } from 'gatsby'

import alertBang from '~images/race-dashboard/alert-bang-orange.svg'

import styles from './no-data.module.scss'

const NoDataPlaceholder = ({ stateName, dataType, metric }) => (
  <div className={styles.noDataContainer}>
    <h3 className={styles.header}>
      <img src={alertBang} alt="" />
      {dataType}
    </h3>
    <p className={styles.content}>
      {stateName} does not report {dataType.toLowerCase()} data for{' '}
      {metric.toLowerCase()}.
      <br />
      <Link to="/race/get-better-data">Help us get better data.</Link>
    </p>
  </div>
)

export default NoDataPlaceholder
