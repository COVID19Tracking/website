import React, { useState } from 'react'
import {
  Form,
  Input,
  Select,
  Textarea,
  Placeholder,
} from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import Deactivated from './form-deactivated'
import advocacyFormStyles from './advocacy-form.module.scss'

export default ({ states }) => {
  const noStateString = '-- Select a state --'

  const [state, setState] = useState(noStateString)

  return (
    <ol className={advocacyFormStyles.container}>
      <li>
        <p className={advocacyFormStyles.sectionLabel}>
          {' '}
          Find your governor’s contact information by selecting your state or
          territory below.
        </p>
        <Form>
          <Select
            label="Which state do you want to get better race and ethnicity data for?"
            name="state"
            id="state"
            options={states}
            isRequired
            onChange={e => setState(e.target.value)}
          />
        </Form>
      </li>

      <li>
        <p className={advocacyFormStyles.sectionLabel}>
          Use the contact information below to send a message to your governor.
        </p>
        <Deactivated>
          <p>
            Please select a state or territory from the list above to get
            contact information.
          </p>
        </Deactivated>
      </li>

      <li>
        <p className={advocacyFormStyles.sectionLabel}>
          When you’re done, use the form below to tell us how it went and what
          response you received.
        </p>
        <Form
          method="POST"
          name="crdt-advocacy"
          action="/todo/set-this-value"
          netlify-honeypot="covid-bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="crdt-advocacy" />
          <Row>
            <Col width={[4, 6, 6]}>
              <Input
                label="First name"
                type="text"
                name="first-name"
                id="first-name"
                isRequired
              />
            </Col>
            <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
              <Input
                label="Last name"
                type="text"
                name="last-name"
                id="last-name"
                isRequired
              />
            </Col>
          </Row>

          <Row>
            <Col width={[4, 6, 6]}>
              <Input
                label="Email address"
                type="email"
                name="email"
                id="email"
                isRequired
              />
            </Col>
            <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
              <Placeholder label="State" isRequired>
                {state !== noStateString ? (
                  <p className={advocacyFormStyles.currentState}>{state}</p>
                ) : (
                  <Deactivated isPlaceholder>
                    <p>No state selected</p>
                  </Deactivated>
                )}
              </Placeholder>
            </Col>
          </Row>

          <Select
            label="Contact method used"
            name="contact-method"
            id="contact-method"
            options={[
              '-- Select a contact method --',
              'Email',
              'Phone',
              "Form on state's website",
              'Other',
            ]}
          />

          <Textarea
            label="How did your experience go? Did you recieve a response?"
            inputtype="text"
            name="experience"
            id="experience"
            rows="5"
          />

          <div style={{ display: 'none' }}>
            <label htmlFor="covid-bot-field">
              If you are a human, don&#8217;t fill out this field:
              <input type="text" name="covid-bot-field" id="covid-bot-field" />
            </label>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </li>
    </ol>
  )
}
