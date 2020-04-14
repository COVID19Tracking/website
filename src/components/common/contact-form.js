import React from 'react'
import ContactFormStyles from './contact-form.module.scss'

export default () => {
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
          <h4>What is your email address?</h4>
          <input type="email" name="name" required />
        </label>
      </div>
      <div>
        <label htmlFor="message">
          <h4>What accessibility problems are you experiencing?</h4>
          <textarea name="message" rows="5" required />
        </label>
      </div>
      <div data-netlify-recaptcha="true" />
      <div>
        <button type="submit">Send your email</button>
      </div>
    </form>
  )
}
