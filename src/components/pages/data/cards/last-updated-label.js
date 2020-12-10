import React from 'react'

import clockIcon from '~images/icons/clock.svg'
import { FormatDate } from '~components/utils/format'

import lastUpdatedLabelStyle from './last-updated-label.module.scss'

const LastUpdatedLabel = ({ date, label = false }) => (
  <div className={lastUpdatedLabelStyle.container}>
    <img src={clockIcon} alt="Clock icon" width="14px" aria-hidden />
    <span className={lastUpdatedLabelStyle.label}>
      {label ? <>{label}</> : <>Data as of</>}{' '}
    </span>
    <time>
      <FormatDate date={date} format="MMMM d, y" />
    </time>
  </div>
)

export default LastUpdatedLabel
