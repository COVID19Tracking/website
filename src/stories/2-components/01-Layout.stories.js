import React from 'react'
import Container from '../../components/common/container'

export default {
  title: 'Layout',
}

const SampleContainer = () => (
  <div style={{ background: 'grey', height: '200px' }} />
)

export const container = () => (
  <Container>
    <SampleContainer />
  </Container>
)
container.story = {
  parameters: {
    info: {
      text:
        'An element that floats in the middle of the page and is useful to wrap content.',
    },
  },
}

export const containerNarrow = () => (
  <Container narrow>
    <SampleContainer />
  </Container>
)
containerNarrow.story = {
  parameters: {
    info: {
      text:
        'A narrow element that aligns to the left side of the page and is useful to wrap content.',
    },
  },
}
