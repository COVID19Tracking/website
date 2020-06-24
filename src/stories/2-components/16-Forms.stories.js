import React from 'react'
import { Form, Input, Select, List } from '../../components/common/form'

export default {
  title: 'Form',
}

Form.displayName = 'Form'

export const input = () => (
  <Form>
    <Input label="Name" type="text" name="name" id="name" isRequired />
  </Form>
)

input.story = {
  parameters: {
    info: {
      text:
        'All form input elements accept `label`, `id`, `name`, `isRequired`, and `detailText` props.',
    },
  },
}

export const inputWithDetail = () => (
  <Form>
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
  </Form>
)

inputWithDetail.story = {
  parameters: {
    info: {
      text: 'Input field with detail text.',
    },
  },
}

export const inputSelect = () => (
  <Form>
    <Select
      label="About how many hours are you available to volunteer each week?"
      name="hours"
      id="hours"
      options={['5-10', '10-15', '15-20']}
      isRequired
    />
  </Form>
)

inputSelect.story = {
  parameters: {
    info: {
      text: 'A select input element',
    },
  },
}

export const inputList = () => (
  <Form>
    <List
      label="When are you most available to volunteer?"
      type="checkbox"
      name="availability"
      options={[
        { value: 'weekdays', label: 'Weekdays' },
        { value: 'mornings', label: 'Weekday mornings' },
        { value: 'evenings', label: 'Weekday evenings' },
        { value: 'weekends', label: 'Weekends' },
      ]}
    />
  </Form>
)

inputList.story = {
  parameters: {
    info: {
      text: 'Lists can either be a `checkbox` or `radio`.',
    },
  },
}
