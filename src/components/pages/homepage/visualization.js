import React from 'react'
import DetailText from '../../common/detail-text'
import { PublicationTitle, PublicationSource } from '../../common/publication'
import visualizationStyles from './visualizations.module.scss'

const Visualization = ({ image, sourceLink, sourceTitle, publicationName }) => (
  <li className={visualizationStyles.visualization}>
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
