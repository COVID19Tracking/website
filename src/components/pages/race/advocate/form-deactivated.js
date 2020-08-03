import React from 'react'
import formDeactivatedStyle from './form-deactivated.module.scss'

export default ({ children }) => (
  <div className={formDeactivatedStyle.container}>{children}</div>
)
