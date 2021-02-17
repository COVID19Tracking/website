import React from 'react'
import classnames from 'classnames'
import Img from 'gatsby-image'
import marked from 'marked'
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
      <figure>
        <a href={image.file.url}>
          <ImageBlock image={image} imageUrl={imageUrl} keepSize={keepSize} />
        </a>
        <caption className={imageContentBlockStyles.caption}>
          <a href={image.file.url}>
            View high-resolution image{' '}
            <span className="a11y-only">of {image.description}</span>
          </a>
        </caption>
      </figure>
    ) : (
      <ImageBlock image={image} imageUrl={imageUrl} keepSize={keepSize} />
    )}

    {caption && <ImageCredit>{marked.inlineLexer(caption, [])}</ImageCredit>}
  </div>
)

export default ImageContentBlock
