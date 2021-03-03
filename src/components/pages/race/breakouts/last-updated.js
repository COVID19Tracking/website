import React from 'react'

import { FormatDate } from '~components/utils/format'

import clockIcon from '~images/icons/clock-dark.svg'
import checkedIcon from '~images/icons/checked.svg'

import styles from './last-updated.module.scss'

const LastUpdated = ({ lastUpdatedByState, lastCheckedByCtp }) => (
  <div>
    <div className={styles.updated}>
      <img src={clockIcon} alt="" />
      Last updated by state:{' '}
      <FormatDate date={lastUpdatedByState} format="M/d/yy" />
    </div>
    <div className={styles.updated}>
      <img src={checkedIcon} alt="" />
      Last checked by CTP:{' '}
      <FormatDate date={lastCheckedByCtp} format="M/d/yy" />
    </div>
  </div>
)

export default LastUpdated
