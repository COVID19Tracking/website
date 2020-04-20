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
        <div className="layout--content-and-rail">
          <div className="layout--content-primary">{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
