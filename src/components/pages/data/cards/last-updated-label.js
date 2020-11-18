import React from 'react'

import clockIcon from '~images/icons/clock.svg'
import { FormatDate } from '~components/utils/format'

import lastUpdatedLabelStyle from './last-updated-label.module.scss'

const LastUpdatedLabel = ({ lastUpdated }) => (
  <div className={lastUpdatedLabelStyle.container}>
    <img src={clockIcon} alt="Clock icon" width="14px" />
    Data as of {lastUpdated}
    <FormatDate date={new Date().getDate()} format="MMMM d, y" />
  </div>
)

export default LastUpdatedLabel
