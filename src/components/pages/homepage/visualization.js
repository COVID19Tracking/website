import React from 'react'
import DetailText from '../../common/detail-text'
import { PublicationTitle, PublicationSource } from '../../common/publication'

const Visualization = ({
  image,
  sourceLink,
  itemClass,
  sourceTitle,
  publicationName,
}) => (
  <li className={itemClass}>
    <h3>
      <a href={sourceLink}>
        <img src={image} alt="" />
        <PublicationTitle>{sourceTitle}</PublicationTitle>
      </a>
    </h3>
    <DetailText>
      Source: <PublicationSource>{publicationName}</PublicationSource>
    </DetailText>
  </li>
)

export default Visualization
