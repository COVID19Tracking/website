import React from 'react'
import { Box } from '../../common/flexbox'
import DetailText from '../../common/detail-text'
import '../../../scss/components/common/publication-formatting.scss'

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
      <cite className="publication-title">
        <a href={sourceLink}>{sourceTitle}</a>
      </cite>
    </p>
    <DetailText>
      Source: <span className="publication-source">{publicationName}</span>
    </DetailText>
  </Box>
)

export default Visualization
