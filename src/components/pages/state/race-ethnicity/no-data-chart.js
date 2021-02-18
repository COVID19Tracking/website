import React from 'react'
import { Link } from 'gatsby'
import Alert from '~components/common/alert'

import styles from './no-data-chart.module.scss'

const NoDataChartPlaceholder = ({ state, dataType, metric }) => (
  <div className={styles.noDataContainer}>
    <Alert>
      {state} does not report {dataType.toLowerCase()} data for{' '}
      {metric.toLowerCase()}.<br />
      <Link to="/race/get-better-data">Help us get better data.</Link>
    </Alert>
  </div>
)

export default NoDataChartPlaceholder
