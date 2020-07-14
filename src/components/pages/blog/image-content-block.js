import React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import ImageCredit from '~components/common/image-credit'
import imageContentBlockStyles from './image-content-block.module.scss'

export default ({ caption, image, className, keepSize = false, imageUrl }) => (
  <div
    className={classnames(
      className,
      imageContentBlockStyles.image,
      keepSize && imageContentBlockStyles.keepSize,
    )}
  >
    {keepSize ? (
      <img src={imageUrl} alt={image.title} />
    ) : (
      <Img fluid={image.fluid} alt={image.title} />
    )}
    {caption && <ImageCredit>{caption['en-US']}</ImageCredit>}
  </div>
)
