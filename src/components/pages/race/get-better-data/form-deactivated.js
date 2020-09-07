import React from 'react'
import classnames from 'classnames'
import formDeactivatedStyle from './form-deactivated.module.scss'

const FormDeactivated = ({ children, isPlaceholder }) => (
  <div
    className={classnames(
      formDeactivatedStyle.container,
      isPlaceholder && formDeactivatedStyle.placeholder,
    )}
  >
    {children}
  </div>
)

export default FormDeactivated
