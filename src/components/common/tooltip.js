import React from 'react'
import Tooltip from '@reach/tooltip'
import tooltipStyles from './tooltip.module.scss'

const ChartTooltip = ({ label, children }) => (
  <Tooltip className={tooltipStyles.tooltip} label={label}>
    {children}
  </Tooltip>
)

export default ChartTooltip
