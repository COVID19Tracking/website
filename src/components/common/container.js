import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children, narrow }) => {
  return (
    <div className={`container ${containerStyles.container}`}>
      {narrow ? (
        <div className={`${containerStyles.containerNarrow}`}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}
