import React from 'react'
import { Form, FormGroup, FormInput } from '~components/common/form'
import DetailText from '~components/common/detail-text'
import formStyle from './form.module.scss'

export default () => (
  <Form>
    <form
      action="https://covidtracking.us4.list-manage.com/subscribe/post?u=0921fdd380ed1e2245d87c3b6&amp;id=14a2b6d1bd"
      method="post"
      target="_blank"
      noValidate
    >
      <div className={formStyle.fieldGroup}>
        <FormGroup className={formStyle.group}>
          <FormInput
            htmlFor="action-form-first-name"
            label="First name"
            inputType="input"
            type="text"
            name="FNAME"
            id="action-form-first-name"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup className={formStyle.group}>
          <FormInput
            htmlFor="action-form-last-name"
            label="Last name"
            inputType="input"
            type="text"
            name="LNAME"
            id="action-form-last-name"
            aria-required
            required
          />
        </FormGroup>
      </div>
      <div className={formStyle.fieldGroup}>
        <FormGroup className={formStyle.group}>
          <FormInput
            htmlFor="action-form-email"
            label="Email address"
            inputType="input"
            type="email"
            name="EMAIL"
            id="action-form-email"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup className={formStyle.group}>
          <FormInput
            htmlFor="action-form-zip"
            label="Zip code"
            inputType="input"
            type="text"
            name="MMERGE3"
            id="action-form-zip"
            maxLength="5"
            className={formStyle.zip}
            aria-required
          />
          <DetailText>
            To receive updates specific to your location, please enter a zip
            code.
          </DetailText>
        </FormGroup>
      </div>
      <FormGroup>
        <input
          type="text"
          name="b_0921fdd380ed1e2245d87c3b6_14a2b6d1bd"
          tabIndex="-1"
          value=""
          style={{ display: 'none' }}
          aria-hidden
        />
        <button type="submit">Subscribe</button>
      </FormGroup>
    </form>
  </Form>
)
