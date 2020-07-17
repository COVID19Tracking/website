import React from 'react'
import { Row, Col } from '~components/common/grid'
import { Form, Input, InputDefinedLength } from '~components/common/form'
import formStyle from './form.module.scss'

export default () => (
  <Form
    action="https://covidtracking.us4.list-manage.com/subscribe/post?u=0921fdd380ed1e2245d87c3b6&amp;id=14a2b6d1bd"
    method="post"
    target="_blank"
    noValidate
  >
    <Row>
      <Col
        width={[4, 6, 6]}
        paddingRight={[0, 0, 32]}
        className={formStyle.grid}
      >
        <Input
          label="First name"
          type="text"
          name="FNAME"
          id="action-form-first-name"
          isRequired
        />
      </Col>
      <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]} className={formStyle.grid}>
        <Input
          label="Last name"
          type="text"
          name="LNAME"
          id="action-form-last-name"
          isRequired
        />
      </Col>
    </Row>
    <Row>
      <Col
        width={[4, 6, 6]}
        paddingRight={[0, 0, 32]}
        className={formStyle.grid}
      >
        <Input
          label="Email address"
          type="email"
          name="EMAIL"
          id="action-form-email"
          isRequired
        />
      </Col>
      <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]} className={formStyle.grid}>
        <InputDefinedLength
          label="Zip code"
          detailText="To receive updates specific to your location, please enter a zip code."
          type="text"
          name="MMERGE3"
          id="action-form-zip"
          maxLength="5"
          className={formStyle.zip}
        />
      </Col>
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
