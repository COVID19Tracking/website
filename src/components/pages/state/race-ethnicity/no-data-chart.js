import React from 'react'
import Alert from '~components/common/alert'
import { FormatDate } from '~components/utils/format'

import styles from './no-data-chart.module.scss'

const NoDataChartPlaceholder = ({ state, dataType, metric, lastUpdated }) => (
  <div className={styles.noDataContainer}>
    <Alert>
      {state} did not report {dataType.toLowerCase()} data for{' '}
      {metric.toLowerCase()} through{' '}
      <FormatDate date={lastUpdated} format="LLLL d, yyyy" />.
    </Alert>
  </div>
)

export default NoDataChartPlaceholder
