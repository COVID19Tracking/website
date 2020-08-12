import React, { useState } from 'react'
import { graphql } from 'gatsby'
import ReCaptcha from 'react-recaptcha'
import Layout from '~components/layout'
import { Form, Textarea, Input, Select, List } from '~components/common/form'
import { Row, Col } from '~components/common/grid'
import { AlertInfobox } from '~components/common/infobox'

export default ({ data }) => {
  const [name, setName] = useState(false)
  const [required, setRequired] = useState({
    state: false,
    date: false,
    name: false,
    email: false,
    body: false,
  })
  const [isComplete, setIsComplete] = useState(false)

  const addRequiredField = (fieldName, event) => {
    required[fieldName] = event.target.value || false
    setRequired(required)
    setIsComplete(!Object.values(required).filter(item => !item))
  }

  return (
    <Layout
      title="Contact Us: Data"
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
          label="State"
          detailText="Please let us know which state's data you have a question or issue about"
          id="contact-state"
          name="state"
          options={[
            'All states (US Data)',
            ...data.allCovidStateInfo.nodes.map(node => node.name),
          ]}
          onChange={event => {
            addRequiredField('state', event)
          }}
        />
        <Input
          type="date"
          label="Date when issue began"
          id="contact-date"
          isRequired
          onChange={event => {
            addRequiredField('date', event)
          }}
        />
        <List
          type="checkbox"
          id="contact-data"
          name="data-fields"
          label="Which data points are you contacting us about?"
          isRequired
          options={[
            'Cases',
            'Tests',
            'Hospitalization',
            'Recovery',
            'Death',
            'Other',
          ].map(item => ({
            value: item,
            label: item,
          }))}
        />
        <Row>
          <Col width={[4, 6, 6]} paddingRight={[0, 0, 32]}>
            <Input
              isRequired
              label="Your name"
              type="text"
              name="name"
              id="contact-name"
              onChange={event => {
                addRequiredField('name', event)
                setName(event.target.value)
              }}
            />
          </Col>
          <Col width={[4, 6, 6]} paddingLeft={[0, 0, 8]}>
            <Input
              isRequired
              type="email"
              label="Your email address"
              name="email"
              id="contact-email"
              onChange={event => {
                addRequiredField('email', event)
              }}
            />
          </Col>
        </Row>
        <Textarea
          label="Please describe the issue"
          name="body"
          id="contact-message"
          isRequired
          onChange={event => {
            addRequiredField('body', event)
          }}
        />
        <div>
          {typeof window !== 'undefined' && (
            <ReCaptcha
              sitekey={data.site.siteMetadata.recaptchaKey}
              render="explicit"
              elementID={`contact-form-captcha-${Math.round(
                Math.random() * 1000,
              )}`}
            />
          )}
        </div>

        <input
          type="text"
          aria-hidden
          style={{ display: 'none' }}
          name="subject"
          tabIndex="-1"
          value={`${name} - Data issues`}
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
        />
        {!isComplete && (
          <div>
            <AlertInfobox>All fields are required.</AlertInfobox>
          </div>
        )}
        <button
          type="submit"
          disabled={!isComplete}
          aria-disabled={!isComplete}
        >
          Contact us
        </button>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        name
      }
    }
  }
`
