import React from 'react'
import containerStyles from '~components/common/landing-page/container.module.scss'

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
