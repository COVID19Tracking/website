import React from 'react'
import Img from 'gatsby-image'
import ImageCredit from '~components/common/image-credit'
import imageContentSyle from './image-content-block.module.scss'

export default ({ caption, image }) => (
  <div className={imageContentSyle.image}>
    <Img fluid={image.fluid} alt={image.title} />
    {caption && <ImageCredit>{caption['en-US']}</ImageCredit>}
  </div>
)
