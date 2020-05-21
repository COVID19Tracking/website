import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children }) => (
  <div className={containerStyles.container}>{children}</div>
)
