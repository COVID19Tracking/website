import React from 'react'
import classnames from 'classnames'
import marked from 'marked'
import ImageCredit from '~components/common/image-credit'
import imageContentBlockStyles from './image-content-block.module.scss'

const ImageBlock = ({ imageUrl, image }) => (
  <>
    <img
      src={imageUrl}
      aria-hidden={image.description ? undefined : true}
      alt={image.description}
      loading="lazy"
    />
  </>
)

const ImageContentBlock = ({
  caption,
  image,
  className,
  longCaption = false,
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

    {caption && !longCaption && <ImageCredit>{caption}</ImageCredit>}
    {longCaption && (
      <ImageCredit>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.inlineLexer(longCaption, []),
          }}
        />
      </ImageCredit>
    )}
  </div>
)

export default ImageContentBlock
