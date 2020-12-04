import React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import ImageCredit from '~components/common/image-credit'
import imageContentBlockStyles from './image-content-block.module.scss'

const ImageBlock = ({ imageUrl, image, keepSize }) => (
  <>
    {keepSize ? (
      <img
        src={imageUrl}
        aria-hidden={image.description ? undefined : true}
        alt={image.description}
        loading="lazy"
      />
    ) : (
      <Img
        fluid={image.fluid}
        aria-hidden={image.description ? undefined : true}
        alt={image.description}
      />
    )}
  </>
)

const ImageContentBlock = ({
  caption,
  image,
  className,
  keepSize = false,
  fullWidthMobile = false,
  imageUrl,
  linkToImage = false,
}) => (
  <div
    className={classnames(
      className,
      imageContentBlockStyles.image,
      fullWidthMobile && imageContentBlockStyles.fullWidthMobile,
      keepSize && imageContentBlockStyles.keepSize,
    )}
  >
    {linkToImage ? (
      <a href={imageUrl}>
        <ImageBlock image={image} imageUrl={imageUrl} keepSize={keepSize} />
      </a>
    ) : (
      <ImageBlock image={image} imageUrl={imageUrl} keepSize={keepSize} />
    )}

    {caption && <ImageCredit>{caption['en-US']}</ImageCredit>}
  </div>
)

export default ImageContentBlock
