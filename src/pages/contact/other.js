import React, { useState } from 'react'
import Layout from '~components/layout'
import { Form, Textarea, Select, Input } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import Recaptcha from '~components/common/recaptcha'
import Alert from '~components/common/alert'

const defaultReason = '-- Select a reason --'

const reasons = [
  '-- Select a reason --',
  'Race and ethnicity data',
  'Long-term care data',
  'Website content or accessibility',
  'Licensing',
  'API or CSV files',
  'Charts',
  'Something else',
]

const ContactOtherPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState(false)
  const [message, setMessage] = useState(false)
  const [reason, setReason] = useState(defaultReason)

  return (
    <Layout
      title="Contact Us"
      socialCard={{
        description:
          'The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution.',
      }}
      centered
    >
      <Form
        method="POST"
        name="fa-form-1"
        action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
        encType="multipart/form-data"
        acceptCharset="utf-8"
        referrerPolicy="unsafe-url"
      >
        <Select
          isRequired
          label="What are you contacting us about?"
          detailText="Please let us know why you are contacting us so we can route your message to the right team. If you are contacting us about a chart or a page on our website, please provide the URL and the title of the chart or page."
          id="contact-reason"
          name="reason"
          options={reasons}
          onChange={event => setReason(event.target.value)}
        />
        <Row>
          <Col width={[4, 6, 6]} paddingRight={[0, 0, 32]}>
            <Input
              isRequired
              label="Your name"
              type="text"
              name="name"
              id="contact-name"
              onChange={event => setName(event.target.value)}
            />
          </Col>
          <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
            <Input
              isRequired
              type="email"
              label="Your email address"
              name="email"
              id="contact-email"
              onChange={event => setEmail(event.target.value)}
            />
          </Col>
        </Row>
            <Input
              type="url"
              label="URL address of the page or chart you are writing us about"
              name="url"
              id="contact-url"
              onChange={event => setURL(event.target.value)}
            />
        <Textarea
          label="Message"
          name="body"
          id="contact-message"
          isRequired
          onChange={event => setMessage(event.target.value)}
        />
        {reason === defaultReason && (
          <Alert>
            Please let us know{' '}
            <a href="#contact-reason">why you are contacting us</a> so we can
            route your message to the right team.
          </Alert>
        )}
        {reason !== defaultReason && !(email && message && name) && (
          <Alert>Name, email, and message are required</Alert>
        )}
        <input
          type="text"
          aria-hidden
          style={{ display: 'none' }}
          name="subject"
          tabIndex="-1"
          value={`${name} - ${reason}`}
        />
        <br />
        <input
          type="hidden"
          name="autoreply-from"
          value="contact@covidtracking.com"
        />
        <input
          type="hidden"
          name="autoreply-sender-name"
          value="The COVID Tracking Project"
        />{' '}
        <div>
          <Recaptcha />
        </div>
        <button
          type="submit"
          disabled={reason === defaultReason || !(email && message && name)}
          aria-disabled={
            reason === defaultReason || !(email && message && name)
          }
        >
          Contact us
        </button>
      </Form>
    </Layout>
  )
}

export default ContactOtherPage
