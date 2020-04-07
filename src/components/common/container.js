import React from 'react'
import containerStyles from '../../scss/components/common/container.module.scss'

export default ({ children, narrow }) => (
  <div
    className={`container ${containerStyles.container} ${narrow &&
      containerStyles.narrow}`}
  >
    {children}
  </div>
)
