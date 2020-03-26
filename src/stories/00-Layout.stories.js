import React from 'react'
import { Flex, Box } from 'reflexbox'

export default {
  title: 'Layout',
  parameters: {
    info: {
      text:
        'We use Reflexbox to do all basic flexbox layouts: https://rebassjs.org/reflexbox',
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
