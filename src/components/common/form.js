import React from 'react'
import formStyles from './form.module.scss'

export default ({ children, name }) => (
  <form
    className={formStyles.form}
    method="POST"
    action="/contact/success"
    netlify-honeypot="covid-bot-field"
    data-netlify="true"
    name={name}
  >
    {children}
  </form>
)
