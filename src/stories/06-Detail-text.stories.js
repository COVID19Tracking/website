import React from 'react'
import DetailText from '../components/common/detail-text'

export default {
  title: 'Detail text',
  parameters: {
    info: {
      text: 'Used for smaller textual elements',
    },
  },
}

export const detailText = () => (
  <DetailText>This only applies to 50% of cases.</DetailText>
)

export const detailTextBlock = () => (
  <DetailText isBlock>
    This only applies to 50% of cases. A display:block element.
  </DetailText>
)
