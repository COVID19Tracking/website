import React from 'react'

const sampleText = `Testing is a crucial part of any public health response, 
and sharing test data is essential to understanding this outbreak. The CDC is 
currently not publishing complete testing data, so we’re doing our best to 
collect it from each state and provide it to the public. The information is 
patchy and inconsistent, so we’re being transparent about what we find and 
how we handle it—the spreadsheet includes our live comments about changing 
data and how we’re working with incomplete information.`

export default {
  title: 'Typography',
}

export const link = () => <a href="#link">A regular text link</a>

export const linkInText = () => (
  <p>
    From here, you can also{' '}
    <a href="/about-tracker/">learn about our methodology</a>,{' '}
    <a href="/about-team/">see who makes this</a>, and{' '}
    <a href="/notes/">
      find out what information states provide and how we handle it
    </a>
    .
  </p>
)

export const headers = () => (
  <>
    <h1>Header level one</h1>
    <h2>Header level two</h2>
    <h3>Header level three</h3>
    <h4>Header level four</h4>
    <h5>Header level five</h5>
  </>
)

export const paragraph = () => (
  <>
    <p>{sampleText}</p>
    <p>{sampleText}</p>
  </>
)

export const inlineStyles = () => (
  <>
    <p>
      <strong>Now is the time</strong> for all good <em>data collectors</em> to{' '}
      <strike>watch Netflix</strike> come to the aid of their{' '}
      <code>country</code>!
    </p>
  </>
)

inlineStyles.story = {
  parameters: {
    info: {
      text: 'An example of `strong`, `em`, `strike`, and `code` elements.',
    },
  },
}
