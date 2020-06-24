import React from 'react'
import { Form, Input, Select, List, Textarea } from '~components/common/form'

export default () => {
  return (
    <Form
      method="POST"
      name="volunteer"
      action="/contact/volunteer-success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <Input label="Name" type="text" name="name" id="name" isRequired />

      <Input
        label="Email"
        type="email"
        name="email"
        id="email"
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
        detailText="Personal website, LinkedIn, or other website that will tell us
              about you."
      />

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
          '40+',
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

      <Input
        label="Specializations / Skills"
        type="text"
        name="skills"
        id="skills"
        isRequired
        detailText="Examples: Python, SQL, Tableau, data viz, editing, social media,
              public health, research, journalism, etc."
      />

      <List
        label="What would you like to volunteer to do?"
        isRequired
        type="radio"
        options={[
          {
            value: 'data',
            label:
              "I'd like to help build data tools, collect data, or analyze data.",
          },

          {
            value: 'website',
            label: "I'd like to help design or build your website.",
          },

          {
            value: 'writing',
            label:
              "I'd like to help write content, monitor news sources, or do original journalism.",
          },
        ]}
        id="workstream"
        name="workstream"
      />

      <Textarea
        label="What kinds of projects or tasks would you most like to help with?"
        inputtype="text"
        name="why"
        id="why"
        rows="5"
      />

      <Input
        label="I was referred by ..."
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

      <button type="submit">Apply to volunteer</button>
    </Form>
  )
}
