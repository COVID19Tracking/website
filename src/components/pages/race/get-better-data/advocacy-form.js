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
import StateScript from './state-script'
import StateContact from './state-contact'

import advocacyFormStyles from './advocacy-form.module.scss'

const AdvocacyForm = ({ states, stateInfo, governors }) => {
  const noStateString = '-- Select a state --'

  const [state, setState] = useState(noStateString)

  return (
    <Form
      method="POST"
      name="crdt-get-better-data"
      action="/race/get-better-data/success"
      netlify-honeypot="covid-bot-field"
      data-netlify="true"
    >
      <ol className={advocacyFormStyles.container}>
        <li>
          <p className={advocacyFormStyles.sectionLabel}>
            {' '}
            Find your governor’s contact information by selecting your state or
            territory below.
          </p>
          <Select
            label="Which state do you want to get better race and ethnicity data for?"
            name="state"
            id="state"
            options={states}
            isRequired
            onChange={e => setState(e.target.value)}
          />
        </li>

        <li>
          <p className={advocacyFormStyles.sectionLabel}>
            Use the contact information below to send a message to your
            governor.
          </p>
          {state !== noStateString ? (
            <>
              <StateContact currentState={state} governors={governors} />
              <StateScript currentStateName={state} stateInfo={stateInfo} />
            </>
          ) : (
            <Deactivated>
              <p>
                Please select a state or territory from the list above to get
                contact information.
              </p>
            </Deactivated>
          )}
        </li>

        <li>
          <p className={advocacyFormStyles.sectionLabel}>
            When you’re done, use the form below to tell us how it went and what
            response you received.
          </p>

          <input type="hidden" name="form-name" value="crdt-get-better-data" />
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
            <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
              <Input
                label="ZIP Code"
                type="text"
                name="zip-code"
                id="zip-code"
              />
            </Col>
          </Row>

          <Input
            label="Email address"
            type="email"
            name="email"
            id="email"
            isRequired
          />

          <Select
            label="Contact method used"
            name="contact-method"
            id="contact-method"
            options={[
              '-- Select a contact method --',
              'Phone',
              'Website form',
              'Facebook',
              'Twitter',
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

          <div className={advocacyFormStyles.checkboxContainer}>
            <Input
              type="checkbox"
              label="Sign me up for email updates and other opportunities to take action"
              name="newsletter-opt-in"
              id="newsletter-opt-in"
            />
          </div>

          <div style={{ display: 'none' }}>
            <label htmlFor="covid-bot-field">
              If you are a human, don&#8217;t fill out this field:
              <input type="text" name="covid-bot-field" id="covid-bot-field" />
            </label>
          </div>

          <button type="submit">Submit</button>
        </li>
      </ol>
    </Form>
  )
}

export default AdvocacyForm
