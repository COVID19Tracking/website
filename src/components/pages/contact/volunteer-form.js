import React from 'react'
import { Form, FormInput } from '~components/common/form'
import { Button } from '~components/common/button'
import {
  RadioOptions,
  HoursPerWeek,
  Timezone,
  Availability,
} from './volunteer-options'

export default () => {
  return (
    <Form
      method="POST"
      name="volunteer"
      action="/contact/volunteer-success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
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

      <FormInput
        label="When are you most available to volunteer?"
        isRequired
        inputtype="fieldset"
        optionsArray={Availability}
        required
        type="checkbox"
        name="availability"
      />

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

      <FormInput
        label="What would you like to volunteer to do?"
        isRequired
        inputtype="fieldset"
        optionsArray={RadioOptions}
        required
        type="radio"
        name="workstream"
      />

      <FormInput
        label="What kinds of projects or tasks would you most like to help with?"
        inputtype="text"
        name="why"
        id="why"
        rows="5"
      />

      <FormInput
        label="I was referred by ..."
        inputtype="input"
        type="text"
        id="referred"
        name="referred"
      />

      <div style={{ display: 'none' }}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&#8217;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>

      <div style={{ marginTop: `28px` }}>
        <Button type="submit">Send your email</Button>
      </div>
    </Form>
  )
}
