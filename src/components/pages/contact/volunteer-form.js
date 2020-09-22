import React, { useState } from 'react'
import isUrl from 'is-url'
import { Form, Input, Select, List, Textarea } from '~components/common/form'
import Alert from '~components/common/alert'

const VolunteerForm = () => {
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [url, setUrl] = useState(false)
  const [skill, setSkill] = useState(false)
  const [timezone, setTimezone] = useState(false)
  const [projects, setProjects] = useState(false)
  const [urlValid, setUrlValid] = useState(false)

  const isComplete = () =>
    name && email && url && skill && timezone && projects && urlValid

  return (
    <Form
      method="POST"
      name="volunteer"
      action="/contact/volunteer-success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="volunteer" />
      <Input
        label="Name"
        type="text"
        name="name"
        id="name"
        isRequired
        onChange={event => setName(event.target.value)}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        id="email"
        onChange={event => setEmail(event.target.value)}
        isRequired
        detailText="If possible, this should be a Gmail or Google-linked address,
              since we rely heavily on Google Docs and Sheets. We will show your
              email internally to other volunteers but will not share it
              elsewhere."
      />

      <Input
        label="URL"
        type="text"
        name="url"
        id="url"
        isRequired
        onChange={event => {
          setUrl(event.target.value)
          setUrlValid(isUrl(event.target.value))
        }}
        detailText="Personal website, LinkedIn, or other website that will tell us
              about you. If you are a journalist or science writer, please link to a writing sample here or in the final question."
      />

      {!urlValid && url && (
        <div>
          <Alert>The link you provided is not a valid URL.</Alert>
        </div>
      )}

      <Select
        label="About how many hours are you available to volunteer each week?"
        name="hours"
        id="hours"
        options={[
          '-- Select hours per week -- ',
          '1-5',
          '5-10',
          '10-20',
          '20-30',
          '30-40',
        ]}
        isRequired
      />

      <Select
        label="What time zone are you in?"
        name="timezone"
        id="timezone"
        options={[
          '-- Select time zone --',
          'Pacific',
          'Mountain',
          'Central',
          'Eastern',
          'Other',
        ]}
        isRequired
        onChange={event => {
          setTimezone(event.target.value !== '-- Select time zone --')
        }}
      />

      <List
        label="When are you most available to volunteer?"
        isRequired
        options={[
          { value: 'weekdays', label: 'Weekdays' },
          { value: 'mornings', label: 'Weekday mornings' },
          { value: 'evenings', label: 'Weekday evenings' },
          { value: 'weekends', label: 'Weekends' },
        ]}
        type="checkbox"
        name="availability"
      />

      <List
        label="Are you 18 or over?"
        isRequired
        type="radio"
        options={[
          {
            value: 'over18',
            label: 'Yes, I am 18 or over',
          },

          {
            value: 'under18',
            label: 'No, I am under 18',
          },
        ]}
        id="age"
        name="age"
      />

      <Input
        label="Specializations / Skills"
        type="text"
        name="skills"
        id="skills"
        isRequired
        onChange={event => setSkill(event.target.value)}
        detailText="Examples: Python, React, Gatsby, Tableau, data visualization, editing, social media, public health, research, journalism, science writing, etc."
      />

      <List
        label="What would you like to volunteer to do?"
        isRequired
        type="radio"
        options={[
          {
            value: 'data',
            label: "I'd like to help collect data or build data tools.",
          },

          {
            value: 'dataviz',
            label:
              "I'd like to help create data visualizations or illustrations.",
          },

          {
            value: 'website',
            label: "I'd like to help design or develop your website.",
          },

          {
            value: 'journalism',
            label:
              'I am a journalism student or professional who can help monitor local news or do outreach to state officials.',
          },

          {
            value: 'scicomm',
            label:
              'I am a health science student or professional who can help review your data and content.',
          },
        ]}
        id="workstream"
        name="workstream"
      />

      <Textarea
        label="Please write 1-3 paragraphs telling us in detail about the skills and experience you can contribute to The COVID Tracking Project."
        inputtype="text"
        name="why"
        id="why"
        rows="10"
        isRequired
        onChange={event => setProjects(event.target.value)}
      />

      <Input
        label="I was referred by ..."
        type="text"
        id="referred"
        name="referred"
      />

      {!isComplete() && (
        <div>
          <Alert>Please complete all fields marked as required.</Alert>
        </div>
      )}

      <div style={{ display: 'none' }}>
        <label htmlFor="covid-bot-field">
          If you are a human, don&#8217;t fill out this field:
          <input type="text" name="covid-bot-field" id="covid-bot-field" />
        </label>
      </div>

      <button
        disabled={!isComplete()}
        aria-disabled={!isComplete()}
        type="submit"
      >
        Apply to volunteer
      </button>
    </Form>
  )
}

export default VolunteerForm
