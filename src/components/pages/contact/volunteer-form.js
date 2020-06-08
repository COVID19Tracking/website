import React from 'react'
import { Form, FormGroup, FormLabel } from '~components/common/form'
import DetailText from '~components/common/detail-text'
import { Button } from '~components/common/button'
import VolunteerFormStyles from './volunteer-form.module.scss'
import {
  RadioOptions,
  HoursPerWeek,
  Timezone,
  Availability,
} from './volunteer-options'

export default () => {
  return (
    <Form>
      <form
        className={VolunteerFormStyles.contactForm}
        method="POST"
        name="volunteer"
        action="/contact/volunteer-success"
        netlify-honeypot="covid-bot-field"
        data-netlify="true"
      >
        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <input type="hidden" name="form-name" value="volunteer" />
            <FormLabel htmlFor="name">
              Name
              <span className={VolunteerFormStyles.label}>required</span>
            </FormLabel>
            <input
              type="text"
              name="name"
              id="name"
              aria-required="true"
              required
            />
          </FormGroup>
        </div>
        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="email">
              Email
              <span className={VolunteerFormStyles.label}>required</span>
            </FormLabel>
            <DetailText>
              If possible, this should be a Gmail or Google-linked address,
              since we rely heavily on Google Docs and Sheets. We will show your
              email internally to other volunteers but will not share it
              elsewhere.
            </DetailText>
            <input
              type="email"
              name="email"
              id="email"
              aria-required="true"
              required
            />
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="url">
              URL <span className={VolunteerFormStyles.label}>optional</span>
            </FormLabel>
            <DetailText>
              Personal website, LinkedIn, or other website that will tell us
              about you.
            </DetailText>
            <input type="text" name="url" id="url" />
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="hours">
              About how many hours are you available to volunteer each week?
              <span className={VolunteerFormStyles.label}>required</span>
            </FormLabel>
            <select name="hours" id="hours" aria-required="true" required>
              {HoursPerWeek.map(item => {
                return (
                  <option key={`hours-${item}`} value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="timezone">
              What time zone are you in?
              <span className={VolunteerFormStyles.label}>required</span>
            </FormLabel>
            <select name="timezone" id="timezone" aria-required="true" required>
              {Timezone.map(item => {
                return (
                  <option key={`timezone-${item}`} value={item}>
                    {item}
                  </option>
                )
              })}
            </select>
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <fieldset className={VolunteerFormStyles.fieldset}>
              <legend>
                When are you most available to volunteer?{' '}
                <span className={VolunteerFormStyles.label}>required</span>
              </legend>

              <div className={VolunteerFormStyles.fieldsetOptions}>
                {Availability.map(item => {
                  return (
                    <label
                      key={`availability-${item.shortname}`}
                      htmlFor={item.shortname}
                      className={VolunteerFormStyles.checkboxLabel}
                    >
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
              </div>
            </fieldset>
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="skills">
              Specializations / Skills
              <span className={VolunteerFormStyles.label}>required</span>
            </FormLabel>
            <DetailText>
              Examples: Python, SQL, Tableau, data viz, editing, social media,
              public health, research, journalism, etc.
            </DetailText>
            <input
              type="text"
              name="skills"
              id="skills"
              aria-required="true"
              required
            />
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <fieldset className={VolunteerFormStyles.fieldset}>
              <legend>
                What would you like to volunteer to do?{' '}
                <span className={VolunteerFormStyles.label}>required</span>
              </legend>

              <div className={VolunteerFormStyles.fieldsetOptions}>
                {RadioOptions.map(item => {
                  return (
                    <div key={`workstream-${item.shortname}`}>
                      <label
                        className={VolunteerFormStyles.radioLabel}
                        htmlFor={item.shortname}
                      >
                        <input
                          required
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
              </div>
            </fieldset>
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="referred">
              I was referred by ...{' '}
              <span className={VolunteerFormStyles.label}>optional</span>
            </FormLabel>
            <input type="text" id="referred" name="referred" />
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.fieldGroup}>
          <FormGroup className={VolunteerFormStyles.group}>
            <FormLabel htmlFor="why">
              What kinds of projects or tasks would you most like to help with?{' '}
              <span className={VolunteerFormStyles.label}>optional</span>
              <textarea name="why" id="why" rows="5" />
            </FormLabel>
          </FormGroup>
        </div>

        <div className={VolunteerFormStyles.botField}>
          <label htmlFor="covid-bot-field">
            If you are a human, don&#8217;t fill out this field:
            <input type="text" name="covid-bot-field" id="covid-bot-field" />
          </label>
        </div>
        <div>
          <Button type="submit">Send your email</Button>
        </div>
      </form>
    </Form>
  )
}
