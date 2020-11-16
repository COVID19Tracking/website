import React from 'react'
import { Row } from '~components/common/grid'
import { Form, Input } from '~components/common/form'
import formStyle from './form.module.scss'

const GetInvolvedForm = () => (
  <Form
    action="https://covidtracking.us4.list-manage.com/subscribe/post?u=0921fdd380ed1e2245d87c3b6&amp;id=14a2b6d1bd"
    method="post"
    target="_blank"
    noValidate
  >
    <Row>
      <div className={formStyle.grid}>
        <Input
          label="Email address"
          type="email"
          name="EMAIL"
          id="action-form-email"
          isRequired
        />
      </div>
    </Row>

    <input
      type="text"
      name="b_0921fdd380ed1e2245d87c3b6_14a2b6d1bd"
      tabIndex="-1"
      value=""
      style={{ display: 'none' }}
      aria-hidden
    />
    <button type="submit">Subscribe</button>
  </Form>
)

export default GetInvolvedForm
