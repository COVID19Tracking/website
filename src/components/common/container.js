import React from 'react'
import classnames from 'classnames'
import containerStyles from './container.module.scss'

export default ({ children, narrow, textHeavy = false }) => {
  return (
    <div
      className={classnames(
        'container',
        containerStyles.container,
        textHeavy && containerStyles.textHeavy,
      )}
    >
      {narrow ? (
        <div className={containerStyles.contentAndRail}>
          <div className={containerStyles.contentPrimary}>{children}</div>
        </div>
      ) : (
        <div className={containerStyles.contentFull}>
          <div className={containerStyles.contentPrimary}>{children}</div>
        </div>
      )}
    </div>
  )
}
