import React from 'react'
import classnames from 'classnames'
import formStyles from './form.module.scss'

const Form = ({ children }) => <div className={formStyles.form}>{children}</div>

const FormGroup = ({ children, className }) => (
  <div className={classnames([formStyles.group, className])}>{children}</div>
)

const FormLabel = ({ children, htmlFor, required }) => (
  <label className={formStyles.label} htmlFor={htmlFor}>
    {children}
    {required && <span className={formStyles.required}>required</span>}
  </label>
)

export { Form, FormGroup, FormLabel }
