import React from 'react'
import clsx from 'clsx'

import { formatNumber, formatDate } from '../../utilities/visualization'
import styles from './total-and-positive-legend.module.scss'

export default ({ date = null, positive, total, perCapita = false }) => (
  <>
    {date && (
      <span className={clsx(styles.item, styles.date)}>{formatDate(date)}</span>
    )}
    <div className={styles.item}>
      <span>{formatNumber(total)}</span>{' '}
      <span className={clsx(styles.legendText, styles.total)}>
        tests {perCapita && 'per million'}
      </span>
    </div>
    <div className={styles.item}>
      <span>{formatNumber(positive)}</span>{' '}
      <span className={clsx(styles.legendText, styles.positive)}>
        positive tests {perCapita && 'per million'}
      </span>
    </div>
  </>
)
