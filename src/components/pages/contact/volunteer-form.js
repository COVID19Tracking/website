import React from 'react'
import { Button } from '../../common/button'
import VolunteerFormStyles from './volunteer-form.module.scss'
import {
  RadioOptions,
  HoursPerWeek,
  Timezone,
  Availability,
} from './volunteer-options'

export default () => {
  return (
    <form
      className={VolunteerFormStyles.contactForm}
      method="POST"
      name="volunteer"
      action="/contact/success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <div>
        <input type="hidden" name="form-name" value="volunteer" />
        <label htmlFor="name" className={VolunteerFormStyles.inputHeader}>
          Name
          <span className={VolunteerFormStyles.required}>(required)</span>
          <input type="text" name="name" id="name" required />
        </label>
      </div>

      <div>
        <label htmlFor="email" className={VolunteerFormStyles.inputHeader}>
          Email
          <span className={VolunteerFormStyles.required}>(required)</span>
          <span className={VolunteerFormStyles.detailText}>
            If possible, this should be a Gmail or Google-linked address, since
            we rely heavily on Google Docs and Sheets. We will show your email
            internally to other volunteers but will not share it elsewhere.
          </span>
          <input type="email" name="email" id="email" required />
        </label>
      </div>

      <div>
        <label htmlFor="url" className={VolunteerFormStyles.inputHeader}>
          URL
          <span className={VolunteerFormStyles.detailText}>
            Personal website, LinkedIn, or other website that will tell us about
            you.
          </span>
          <input type="text" name="url" id="url" />
        </label>
      </div>

      <div>
        <label htmlFor="hours" className={VolunteerFormStyles.inputHeader}>
          About how many hours are you available to work?
          <span className={VolunteerFormStyles.required}>(required)</span>
          <select name="hours" id="hours" required>
            {HoursPerWeek.map(item => {
              return <option value={item}>{item}</option>
            })}
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="timezone" className={VolunteerFormStyles.inputHeader}>
          What time zone are you in?
          <span className={VolunteerFormStyles.required}>(required)</span>
          <select name="timezone" id="timezone" required>
            {Timezone.map(item => {
              return <option value={item}>{item}</option>
            })}
          </select>
        </label>
      </div>

      <div>
        <fieldset>
          <legend>
            When are you most available to work?
            <span className={VolunteerFormStyles.required}>(required)</span>
          </legend>
          {Availability.map(item => {
            return (
              <label htmlFor={item.shortname}>
                <input
                  type="checkbox"
                  name="availability"
                  value={item.description}
                  id={item.shortname}
                />
                {item.description}
              </label>
            )
          })}
        </fieldset>
      </div>

      <div>
        <label htmlFor="skills" className={VolunteerFormStyles.inputHeader}>
          Specializations / Skills
          <span className={VolunteerFormStyles.required}>(required)</span>
          <span className={VolunteerFormStyles.detailText}>
            Examples: Python, SQL, Tableau, data viz, editing, social media,
            public health, research, journalism, etc.
          </span>
          <input type="text" name="skills" id="skills" required />
        </label>
      </div>

      <div>
        <fieldset>
          <legend className={VolunteerFormStyles.inputHeader}>
            What would you like to volunteer to do for us?
            <span className={VolunteerFormStyles.required}>(required)</span>
          </legend>
          {RadioOptions.map(item => {
            return (
              <div>
                <label htmlFor={item.shortname}>
                  <input
                    type="radio"
                    name="workstream"
                    id={item.shortname}
                    value={item.description}
                  />
                  {item.description}
                </label>
              </div>
            )
          })}
        </fieldset>
      </div>

      <div>
        <label htmlFor="referred" className={VolunteerFormStyles.inputHeader}>
          I was referred by ...
          <input type="text" id="referred" name="referred" />
        </label>
      </div>

      <div>
        <label htmlFor="why" className={VolunteerFormStyles.inputHeader}>
          Why are you interested in volunteering for us?
          <textarea name="why" id="why" rows="5" />
        </label>
      </div>
      <div className={VolunteerFormStyles.botField}>
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
