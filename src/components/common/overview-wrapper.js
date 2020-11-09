import React from 'react'
import classnames from 'classnames'
import overviewWrapperStyles from './overview-wrapper.module.scss'

const OverviewWrapper = ({ children, className = false }) => (
  <div
    className={classnames(
      overviewWrapperStyles.wrapper,
      className && className,
    )}
  >
    {children}
  </div>
)

export default OverviewWrapper
