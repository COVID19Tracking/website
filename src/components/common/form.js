import React from 'react'
// import classnames from 'classnames'
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

const FieldDetailText = ({ detailText }) => {
  if (!detailText) {
    return null
  }
  return (
    <div className={formStyles.detailContainer}>
      <DetailText>{detailText}</DetailText>
    </div>
  )
}

const Textarea = ({
  label,
  id,
  name,
  isRequired,
  detailText,
  rows,
  onChange,
}) => (
  <>
    <FormLabel htmlFor={id} isRequired={isRequired}>
      {label}
    </FormLabel>
    <textarea
      name={name}
      id={id}
      aria-required={isRequired}
      rows={rows}
      onChange={onChange}
    />
    <FieldDetailText detailText={detailText} />
  </>
)

const Input = ({
  label,
  type,
  id,
  name,
  isRequired,
  detailText,
  onChange,
  maxLength,
  className,
}) => (
  <>
    <FormLabel htmlFor={id} isRequired={isRequired}>
      {label}
    </FormLabel>
    <input
      name={name}
      id={id}
      type={type}
      aria-required={isRequired}
      onChange={onChange}
      maxLength={maxLength}
      className={`${className} ${
        detailText ? formStyles.inputDescription : null
      }`}
    />
    <FieldDetailText detailText={detailText} />
  </>
)

const Select = ({
  label,
  id,
  name,
  isRequired,
  detailText,
  options,
  onChange,
  value,
}) => (
  <>
    <FormLabel htmlFor={id} isRequired={isRequired}>
      {label}
    </FormLabel>
    <select
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      className={`${formStyles.select} ${
        detailText ? formStyles.inputDescription : null
      }`}
    >
      {options.map(item => (
        <option key={`${id}-${item}`} value={item}>
          {item}
        </option>
      ))}
    </select>
    <FieldDetailText detailText={detailText} />
  </>
)

const List = ({ type, name, options, label, isRequired, detailText }) => (
  <>
    <fieldset className={formStyles.fieldset}>
      <FormLabel isRequired={isRequired}>
        <legend>{label}</legend>
      </FormLabel>
      <div
        className={`${formStyles.fieldsetOptions} ${
          detailText ? formStyles.inputDescription : null
        }`}
      >
        {options &&
          options.map(item => (
            <label
              key={`${name}-${item.value}`}
              htmlFor={item.value}
              className={formStyles.checkboxLabel}
            >
              <input type={type} value={item.label} id={item.value} />
              {item.label}
            </label>
          ))}
      </div>
      <FieldDetailText detailText={detailText} />
    </fieldset>
  </>
)

export { Form, FormLabel, Textarea, Select, Input, List }
