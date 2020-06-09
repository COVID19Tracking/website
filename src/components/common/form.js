import React from 'react'
import classnames from 'classnames'
import formStyles from './form.module.scss'

const Form = props => {
  const { children } = props
  return (
    <form className={formStyles.form} {...props}>
      {children}
    </form>
  )
}

const FormGroup = ({ children, className }) => (
  <div className={classnames([formStyles.group, className])}>{children}</div>
)
const FormLabel = ({ children, htmlFor, required }) => (
  <label className={formStyles.label} htmlFor={htmlFor}>
    {children}
    {required ? (
      <span className={formStyles.required}>required</span>
    ) : (
      <span className={formStyles.required}>optional</span>
    )}
  </label>
)

const FormInput = props => {
  const { inputtype, htmlFor, required, label } = props

  let inputElement = null
  switch (inputtype) {
    case 'text':
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} required={required}>
            <textarea {...props} />
          </FormLabel>
        </>
      )
      break
    case 'input':
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} required={required}>
            {label}
          </FormLabel>
          <input {...props} />
        </>
      )
      break
    case 'justinput':
      inputElement = <input {...props} />
      break
    default:
      inputElement = <input {...props} />
  }
  return inputElement
}

export { Form, FormGroup, FormInput, FormLabel }
