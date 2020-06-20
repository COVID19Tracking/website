import React from 'react'
import {
  HoursPerWeek,
  Availability,
} from '../../components/pages/contact/volunteer-options'

import {
  Form,
  FormInput,
  FormGroup,
  FormGroupChild,
} from '../../components/common/form'

import VolunteerFormExample from '../../components/pages/contact/volunteer-form'

export default {
  title: 'Form',
}

Form.displayName = 'Form'

export const input = () => (
  <Form>
    <FormInput
      label="Name"
      inputtype="input"
      type="text"
      name="name"
      id="name"
      isRequired
    />
  </Form>
)

input.story = {
  parameters: {
    info: {
      text:
        'How to set up a input for a form. You can pass any normal input props inside',
    },
  },
}

export const inputWithDetail = () => (
  <Form>
    <FormInput
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
  </Form>
)

inputWithDetail.story = {
  parameters: {
    info: {
      text:
        'Input field with a detail element on it. You will need to pass the it in `detailText`.You can pass any normal input props inside',
    },
  },
}

export const inputSelect = () => (
  <Form>
    <FormInput
      label="About how many hours are you available to volunteer each week?"
      inputtype="select"
      name="hours"
      id="hours"
      optionsArray={HoursPerWeek}
      aria-required="true"
      isRequired
      required
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

export const inputFieldSet = () => (
  <Form>
    <FormInput
      label="When are you most available to volunteer?"
      isRequired
      inputtype="fieldset"
      optionsArray={Availability}
      required
      type="checkbox"
      name="availability"
    />
  </Form>
)

inputFieldSet.story = {
  parameters: {
    info: {
      text:
        'A fieldset input element. Please note the the styling is not working 100%',
    },
  },
}

export const groupHalfWidth = () => (
  <Form>
    <FormGroup>
      <FormGroupChild>
        <FormInput
          //   htmlFor="action-form-first-name"
          label="First name"
          inputtype="input"
          type="text"
          name="FNAME"
          id="action-form-first-name"
          aria-required
          isRequired
        />
      </FormGroupChild>
      <FormGroupChild>
        <FormInput
          //   htmlFor="action-form-last-name"
          label="Last name"
          inputtype="input"
          type="text"
          name="LNAME"
          id="action-form-last-name"
          aria-required
        />
      </FormGroupChild>
    </FormGroup>
  </Form>
)

groupHalfWidth.story = {
  parameters: {
    info: {
      text:
        'A responsive form that will be responsive with elements taking half the width of the screen',
    },
  },
}

export const volunteerFormExample = () => <VolunteerFormExample />

volunteerFormExample.story = {
  parameters: {
    info: {
      text:
        'Example of the Volunteer Form. Please note the the styling is not working 100%',
    },
  },
}
