import React from 'react'
import { Button } from './button'
import Form from './form'
import formStyles from './form.module.scss'

export default ({ name, messageCopy }) => {
  return (
    <Form name={name}>
      <div className={formStyles.formGroup}>
        <input type="hidden" name="form-name" value={name} />
        <label htmlFor="email">
          What is your email address?
          <input type="email" name="email" required />
        </label>
      </div>
      <div className={formStyles.formGroup}>
        <label htmlFor="message">
          {messageCopy}
          <textarea name="message" rows="5" required />
        </label>
      </div>
      <div className={formStyles.botField}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&apos;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>
      <div>
        <Button type="submit">Send your email</Button>
      </div>
    </Form>
  )
}
