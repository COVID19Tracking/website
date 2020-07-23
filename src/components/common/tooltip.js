import React from 'react'
import Tooltip from '@reach/tooltip'
import tooltipStyles from './tooltip.module.scss'

export default ({ label, children }) => (
  <Tooltip className={tooltipStyles.tooltip} label={label}>
    {children}
  </Tooltip>
)
