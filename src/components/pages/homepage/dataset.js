import React from 'react'
import Img from 'gatsby-image'
import datasetStyles from './dataset.module.scss'

export default ({ image, title, children, imageAlt, flip = false }) => (
  <div className={`${datasetStyles.dataset} ${flip ? datasetStyles.flip : ''}`}>
    <div className={datasetStyles.image}>
      <Img fluid={image} alt={imageAlt} />
    </div>
    <div className={datasetStyles.info}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)
