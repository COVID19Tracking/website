import React from 'react'
import containerStyles from './container.module.scss'

export default ({ children, narrow, textHeavy = false }) => (
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
      <div className="layout--content-full">
        <div className="layout--content-primary">{children}</div>
      </div>
    )}
  </div>
)
