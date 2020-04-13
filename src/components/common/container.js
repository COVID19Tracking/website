import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children, narrow }) => {
  if (narrow) {
    return (
      <div className={`container ${containerStyles.container}`}>
        <div className={`${narrow && containerStyles.containerNarrow}`}>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className={`container ${containerStyles.container}`}>{children}</div>
  )
}
