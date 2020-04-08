import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children, narrow }) => (
  <div
    className={`container ${containerStyles.container} ${narrow &&
      containerStyles.narrow}`}
  >
    {children}
  </div>
)
