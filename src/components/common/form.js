import React from 'react'
import classnames from 'classnames'
import formStyles from './form.module.scss'
import DetailText from '~components/common/detail-text'

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

const FormLabel = ({ children, htmlFor, isRequired }) => (
  <label className={formStyles.label} htmlFor={htmlFor}>
    {children}
    {isRequired ? (
      <span className={formStyles.required}>required</span>
    ) : (
      <span className={formStyles.required}>optional</span>
    )}
  </label>
)

const FormInput = props => {
  const {
    inputtype,
    htmlFor,
    isRequired,
    label,
    detailText,
    optionsArray,
  } = props

  let inputElement = null
  switch (inputtype) {
    case 'text':
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} isRequired={isRequired}>
            {label}
          </FormLabel>
          <textarea {...props} />
        </>
      )
      break
    case 'input':
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} isRequired={isRequired}>
            {label}
          </FormLabel>
          <input {...props} />
        </>
      )
      break
    case `inputWithDetail`:
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} isRequired={isRequired}>
            {label}
          </FormLabel>
          <input {...props} />
          <DetailText>{detailText}</DetailText>
        </>
      )
      break

    case 'justinput':
      inputElement = <input {...props} />
      break

    case `select`:
      inputElement = (
        <>
          <FormLabel htmlFor={htmlFor} isRequired={isRequired}>
            {label}
          </FormLabel>
          <select {...props} className={formStyles.select}>
            {optionsArray.map(item => (
              <option key={`hours-${item}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </>
      )
      break

    case `fieldset`:
      inputElement = (
        <>
          <fieldset className={formStyles.fieldset}>
            <legend className={formStyles.label}>
              {label}
              {isRequired ? (
                <span className={formStyles.required}>required</span>
              ) : (
                <span className={formStyles.required}>optional</span>
              )}
            </legend>
            <div className={formStyles.fieldsetOptions}>
              {optionsArray &&
                optionsArray.map(item => (
                  <label
                    key={`availability-${item.shortname}`}
                    htmlFor={item.shortname}
                    className={formStyles.checkboxLabel}
                  >
                    <input
                      {...props}
                      value={item.description}
                      id={item.shortname}
                    />
                    {item.description}
                  </label>
                ))}
            </div>
          </fieldset>
        </>
      )
      break

    default:
      inputElement = <input {...props} />
  }
  return inputElement
}

export { Form, FormGroup, FormInput, FormLabel }
