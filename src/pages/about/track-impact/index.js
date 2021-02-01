import React, { useState } from 'react'
import Layout from '~components/layout'
import { Form, Textarea, Input, List } from '~components/common/form'
import Alert from '~components/common/alert'
import LongContent from '~components/common/long-content'

const ImpactFormPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [use, setUse] = useState('')

  const isComplete = () => name && use && email

  return (
    <Layout
      title="Help Us Track Our Impact"
      socialCard={{
        description:
          'If you’ve used data or analyses from COVID Tracking Project over the past 11 months, please let us know how you used our work.',
      }}
      centered
    >
      <LongContent>
        <p>
          If you’ve used data or analyses from COVID Tracking Project over the
          past 11 months, please let us know how you used our work, how it
          helped you, and anything else you’d like us to know about what the
          project has meant to you. Please fill out the form below. Your
          response is confidential, and we won’t publish anything identifiable
          without your permission.
        </p>
      </LongContent>
      <Form
        method="POST"
        name="impact"
        action="/about/track-impact/success"
        netlify-honeypot="covid-bot-field"
        data-netlify="true"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          id="name"
          onChange={event => setName(event.target.value)}
          isRequired
        />
        <Input
          type="email"
          label="Email address"
          name="email"
          id="email"
          onChange={event => setEmail(event.target.value)}
          isRequired
        />
        <Input type="text" label="Profession/Title" name="title" id="title" />
        <Textarea
          label="How have you used our data or interpretations?"
          name="use"
          id="use"
          isRequired
          onChange={event => setUse(event.target.value)}
        />
        <Textarea
          label="Is there anything else you’d like us to know?"
          name="anything-else"
          id="anything-else"
        />
        <List
          type="checkbox"
          options={[
            {
              value: 'yes',
              label:
                'It’s ok to contact me with follow-up questions about my use of the data',
            },
          ]}
        />
        {!isComplete() && (
          <Alert block>
            Please provide a {(!name || !email) && <>name and email</>}
            {!use && (
              <>
                {(!name || !email) && <> and a</>} description of how you used
                our data{' '}
              </>
            )}
            .
          </Alert>
        )}
        <button
          type="submit"
          disabled={!isComplete()}
          aria-disabled={!isComplete()}
        >
          Submit
        </button>
      </Form>
    </Layout>
  )
}

export default ImpactFormPage
