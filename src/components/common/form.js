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

const FormInput = props => {
  const { inputType, htmlFor, required, label } = props

  let inputElement = null
  switch (inputType) {
    case 'text':
      inputElement = <textarea {...props} />
      break
    case 'input':
      inputElement = (
        <>
          <label className={formStyles.label} htmlFor={htmlFor}>
            {label}
            {required ? (
              <span className={formStyles.required}>required</span>
            ) : (
              <span className={formStyles.required}>optional</span>
            )}
          </label>
          <input {...props} />
        </>
      )
      break
    default:
      inputElement = <input {...props} />
  }
  return inputElement
}

export { Form, FormGroup, FormInput, FormLabel }
