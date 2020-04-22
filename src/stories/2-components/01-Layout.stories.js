import React from 'react'
import { Flex, Box } from '../../components/layout/flexbox'
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

export const flexBox = () => (
  <Flex flexWrap="wrap">
    <Box width={[1, 1 / 2]} p={3}>
      This is on the left or top
    </Box>
    <Box width={[1, 1 / 2]} p={3}>
      This is on the right, or bottom
    </Box>
  </Flex>
)

flexBox.story = {
  parameters: {
    info: {
      text:
        'We use Reflexbox to do all basic flexbox layouts: https://rebassjs.org/reflexbox',
    },
  },
}
