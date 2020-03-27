import React from 'react'
import Disclosure from '../components/common/disclosure'

export default {
  title: 'Disclosure',
}

export const disclosure = () => (
  <Disclosure title="Why are we doing this?">
    <p>
      Testing is a crucial part of any public health response, and sharing test
      data is essential to understanding this outbreak. The CDC is currently not
      publishing complete testing data, so we’re doing our best to collect it
      from each state and provide it to the public. The information is patchy
      and inconsistent, so we’re being transparent about what we find and how we
      handle it—the spreadsheet includes our live comments about changing data
      and how we’re working with incomplete information.
    </p>
    <p>
      From here, you can also{' '}
      <a href="/about-tracker/">learn about our methodology</a>,{' '}
      <a href="/about-team/">see who makes this</a>, and{' '}
      <a href="/notes/">
        find out what information states provide and how we handle it
      </a>
      .
    </p>
  </Disclosure>
)

disclosure.story = {
  parameters: {
    info: {
      text:
        'Used to visually hide elements on a page and give users the option to expand content.',
    },
  },
}
