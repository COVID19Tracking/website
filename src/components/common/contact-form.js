import React from 'react'
import { Button } from './button'
import ContactFormStyles from './contact-form.module.scss'

export default ({ name, messageCopy }) => {
  return (
    <form
      className={ContactFormStyles.contactForm}
      name={name}
      method="POST"
      action="/contact/success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <div>
        <input type="hidden" name="form-name" value={name} />
        <label htmlFor="email" className={ContactFormStyles.inputHeader}>
          What is your email address?
          <input type="email" name="email" required />
        </label>
      </div>
      <div>
        <label htmlFor="message" className={ContactFormStyles.inputHeader}>
          {messageCopy}
          <textarea name="message" rows="5" required />
        </label>
      </div>
      <div className={ContactFormStyles.botField}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&apos;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>
      <div>
        <Button type="submit">Send your email</Button>
      </div>
    </form>
  )
}
