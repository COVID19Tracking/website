import React from 'react'
import Container from '../components/common/container'

const sampleText = `Testing is a crucial part of any public health response, 
and sharing test data is essential to understanding this outbreak. The CDC is 
currently not publishing complete testing data, so we’re doing our best to collect 
it from each state and provide it to the public. The information is patchy and 
inconsistent, so we’re being transparent about what we find and how we handle 
it—the spreadsheet includes our live comments about changing data and how we’re 
working with incomplete information.`

export default {
  title: 'Container',
  parameters: {
    info: {
      text:
        'An element that floats in the middle of the page and is useful to wrap content.',
    },
  },
}

export const regular = () => <Container>{sampleText}</Container>
export const narrow = () => <Container narrow>{sampleText}</Container>
