import React from 'react'

import clockIcon from '~images/icons/clock.svg'
import { FormatDate } from '~components/utils/format'

import lastUpdatedLabelStyle from './last-updated-label.module.scss'

const LastUpdatedLabel = ({ date }) => (
  <div className={lastUpdatedLabelStyle.container}>
    <img src={clockIcon} alt="Clock icon" width="14px" />
    Data as of <FormatDate date={date} format="MMMM d, y" />
  </div>
)

export default LastUpdatedLabel
