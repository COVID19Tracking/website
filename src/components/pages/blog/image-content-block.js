import React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import ImageCredit from '~components/common/image-credit'
import imageContentBlockStyles from './image-content-block.module.scss'

export default ({ caption, image, className }) => (
  <div className={classnames(className, imageContentBlockStyles.image)}>
    <Img fluid={image.fluid} alt={image.title} />
    {caption && <ImageCredit>{caption['en-US']}</ImageCredit>}
  </div>
)
