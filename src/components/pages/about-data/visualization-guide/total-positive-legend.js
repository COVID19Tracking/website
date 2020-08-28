import React from 'react'
import classnames from 'classnames'

import { formatNumber, formatDate } from '~utilities/visualization'
import styles from './total-and-positive-legend.module.scss'

const PER_CAPITA_TEXT = 'per capita*'

export default ({ date = null, positive, total, perCapita = false }) => (
  <>
    {date && (
      <span className={classnames(styles.item, styles.date)}>
        {formatDate(date)}
      </span>
    )}
    <div className={styles.item}>
      <span>{formatNumber(total)}</span>{' '}
      <span className={classnames(styles.legendText, styles.total)}>
        total tests {perCapita && PER_CAPITA_TEXT}
      </span>
    </div>
    <div className={styles.item}>
      <span>{formatNumber(positive)}</span>{' '}
      <span className={classnames(styles.legendText, styles.positive)}>
        positive tests {perCapita && PER_CAPITA_TEXT}
      </span>
    </div>
  </>
)
