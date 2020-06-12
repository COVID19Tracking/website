import React from 'react'
import { Form, FormGroup, FormInput } from '~components/common/form'
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
        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="name"
            label="Name"
            inputtype="input"
            type="text"
            name="name"
            id="name"
            aria-required="true"
            isRequired
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="email"
            label="Email"
            inputtype="inputWithDetail"
            type="email"
            name="email"
            id="email"
            aria-required="true"
            isRequired
            detailText="If possible, this should be a Gmail or Google-linked address,
              since we rely heavily on Google Docs and Sheets. We will show your
              email internally to other volunteers but will not share it
              elsewhere."
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="url"
            label="URL"
            inputtype="inputWithDetail"
            type="text"
            name="url"
            id="url"
            detailText="Personal website, LinkedIn, or other website that will tell us
              about you."
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="hours"
            label="About how many hours are you available to volunteer each week?"
            inputtype="select"
            name="hours"
            id="hours"
            optionsArray={HoursPerWeek}
            aria-required="true"
            isRequired
            required
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="htimezone"
            label="What time zone are you in?"
            inputtype="select"
            name="timezone"
            id="timezone"
            aria-required="true"
            optionsArray={Timezone}
            isRequired
            required
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            label="When are you most available to volunteer?"
            isRequired
            inputtype="fieldset"
            optionsArray={Availability}
            required
            type="checkbox"
            name="availability"
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            htmlFor="skills"
            label="Specializations / Skills"
            inputtype="inputWithDetail"
            type="text"
            name="skills"
            id="skills"
            aria-required="true"
            isRequired
            detailText="Examples: Python, SQL, Tableau, data viz, editing, social media,
              public health, research, journalism, etc."
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            label="What would you like to volunteer to do?"
            isRequired
            inputtype="fieldset"
            optionsArray={RadioOptions}
            required
            type="radio"
            name="workstream"
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            label="What kinds of projects or tasks would you most like to help with?"
            inputtype="text"
            name="why"
            id="why"
            rows="5"
          />
        </FormGroup>

        <FormGroup className={VolunteerFormStyles.group}>
          <FormInput
            label="I was referred by ..."
            inputtype="input"
            type="text"
            id="referred"
            name="referred"
          />
        </FormGroup>

        <div className={VolunteerFormStyles.botField}>
          <label htmlFor="covid-bot-field">
            If you are a human, don&#8217;t fill out this field:
            <input type="text" name="covid-bot-field" id="covid-bot-field" />
          </label>
        </div>

        <div style={{ marginTop: `28px` }}>
          <Button type="submit">Send your email</Button>
        </div>
      </form>
    </Form>
  )
}
