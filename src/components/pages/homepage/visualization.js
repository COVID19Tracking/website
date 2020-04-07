import React from 'react'
import { Box } from '../../common/flexbox'
import DetailText from '../../common/detail-text'
import publicationFormattingStyle from '../../../scss/components/common/publication-formatting.module.scss'

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
      <cite className={publicationFormattingStyle.title}>
        <a href={sourceLink}>{sourceTitle}</a>
      </cite>
    </p>
    <DetailText>
      Source:{' '}
      <span className={publicationFormattingStyle.source}>
        {publicationName}
      </span>
    </DetailText>
  </Box>
)

export default Visualization
