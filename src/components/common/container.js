import React from 'react'
import classnames from 'classnames'
import containerStyles from './container.module.scss'

export default ({ children, narrow }) => {
  return (
    <div className={classnames('container', containerStyles.container)}>
      <div className={narrow ? containerStyles.narrow : containerStyles.full}>
        {children}
      </div>
    </div>
  )
}
