import React from 'react'
import { Box } from '../../common/flexbox'
import DetailText from '../../common/detail-text'

const Visualization = ({
  image,
  altText,
  sourceLink,
  sourceTitle,
  publicationName,
}) => (
  <Box width={[1, 1, 1 / 3]} px={[0, '0.5rem']}>
    <img src={image} alt={altText} />
    <p>
      <a href={sourceLink}>{sourceTitle}</a>
    </p>
    <DetailText>Source: {publicationName}</DetailText>
  </Box>
)

export default Visualization
