import React from 'react'
import { Box } from '../../common/flexbox'
import DetailText from '../../common/detail-text'
import { PublicationTitle, PublicationSource } from '../../common/publication'

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
      <PublicationTitle>
        <a href={sourceLink}>{sourceTitle}</a>
      </PublicationTitle>
    </p>
    <DetailText>
      Source: <PublicationSource>{publicationName}</PublicationSource>
    </DetailText>
  </Box>
)

export default Visualization
