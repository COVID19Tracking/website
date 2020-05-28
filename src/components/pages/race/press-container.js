import React from 'react'
import pressContainerStyles from '~components/pages/race/press-container.module.scss'

export default ({ children }) => (
  <div className={pressContainerStyles.container}>{children}</div>
)
