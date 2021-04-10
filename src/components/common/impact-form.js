import React, { useState } from 'react'
import { Form, Textarea, Input, List } from '~components/common/form'
import Alert from '~components/common/alert'

const ImpactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [use, setUse] = useState('')

  const isComplete = () => name && use && email

  return (
    <Form
      method="POST"
      name="impact"
      action="/about/track-impact/success"
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value="impact" />
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
        label="How have you used our data or analysis?"
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
              {(!name || !email) && <> and a</>} description of how you used our
              data{' '}
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
  )
}

export default ImpactForm
