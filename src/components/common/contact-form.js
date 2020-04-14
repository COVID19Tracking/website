import React from 'react'
import ContactFormStyles from './contact-form.module.scss'

export default ({ messageCopy }) => {
  return (
    <form
      className={ContactFormStyles.contactForm}
      name="contact"
      method="POST"
      data-netlify-recaptcha="true"
      data-netlify="true"
    >
      <div>
        <label htmlFor="name">
          <p className={ContactFormStyles.inputHeader}>
            What is your email address?
          </p>
          <input type="email" id="name" name="name" required />
        </label>
      </div>
      <div>
        <label htmlFor="message">
          <p className={ContactFormStyles.inputHeader}>{messageCopy}</p>
          <textarea name="message" id="message" rows="5" required />
        </label>
      </div>
      <div data-netlify-recaptcha="true" />
      <div>
        <button type="submit">Send your email</button>
      </div>
    </form>
  )
}
