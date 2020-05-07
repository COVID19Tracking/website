import React from 'react'
import formStyles from './form.module.scss'

const Form = ({ children }) => <div className={formStyles.form}>{children}</div>

const FormGroup = ({ children }) => (
  <div className={formStyles.group}>{children}</div>
)

const FormLabel = ({ children, htmlFor }) => (
  <label className={formStyles.label} htmlFor={htmlFor}>
    {children}
  </label>
)

export { Form, FormGroup, FormLabel }
