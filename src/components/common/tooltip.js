import React from 'react'
import Tooltip from '@reach/tooltip'
import tooltipStyles from './tooltip.module.scss'

const DefaultTooltip = ({ label, children }) => (
  <Tooltip className={tooltipStyles.tooltip} label={label}>
    {children}
  </Tooltip>
)

export default DefaultTooltip
