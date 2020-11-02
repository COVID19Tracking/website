import React from 'react'
import overviewWrapperStyles from './overview-wrapper.module.scss'

const OverviewWrapper = ({ children }) => (
  <div className={overviewWrapperStyles.wrapper}>{children}</div>
)

export default OverviewWrapper
