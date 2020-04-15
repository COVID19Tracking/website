import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children, narrow, textHeavy = false }) => {
  return (
    <div
      className={`container ${textHeavy && containerStyles.textHeavy} ${
        containerStyles.container
      }`}
    >
      {narrow ? (
        <div className={`${containerStyles.containerNarrow}`}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}
