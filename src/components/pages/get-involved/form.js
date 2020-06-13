import React from 'react'
import { Form, FormGroup, FormInput } from '~components/common/form'
import formStyle from './form.module.scss'

export default () => (
  <Form
    action="https://covidtracking.us4.list-manage.com/subscribe/post?u=0921fdd380ed1e2245d87c3b6&amp;id=14a2b6d1bd"
    method="post"
    target="_blank"
    noValidate
  >
    <div className={formStyle.fieldGroup}>
      <div className={formStyle.group}>
        <FormInput
          htmlFor="action-form-first-name"
          label="First name"
          inputtype="input"
          type="text"
          name="FNAME"
          id="action-form-first-name"
          aria-required
          isRequired
        />
      </div>
      <div className={formStyle.group}>
        <FormInput
          htmlFor="action-form-last-name"
          label="Last name"
          inputtype="input"
          type="text"
          name="LNAME"
          id="action-form-last-name"
          aria-required
          isRequired
        />
      </div>
    </div>
    <div className={formStyle.fieldGroup}>
      <div className={formStyle.group}>
        <FormInput
          htmlFor="action-form-email"
          label="Email address"
          inputtype="input"
          type="email"
          name="EMAIL"
          id="action-form-email"
          aria-required
          isRequired
        />
      </div>
      <div className={formStyle.group}>
        <FormInput
          htmlFor="action-form-zip"
          label="Zip code"
          inputtype="inputWithDetail"
          detailText="To receive updates specific to your location, please enter a zip code."
          type="text"
          name="MMERGE3"
          id="action-form-zip"
          maxLength="5"
          className={formStyle.zip}
          aria-required
        />
      </div>
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
  </Form>
)
