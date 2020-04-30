import React from 'react'
import BlogImage from './blog-image'
import imageContentBlockStyles from './image-content-block.module.scss'
import featuredImageStyles from './featured-image.module.scss'

export default ({ image }) => (
  <>
    <BlogImage
      imageSource={image.resize.src}
      imageAlt={image.title}
      caption={image.title}
      containerStyle={imageContentBlockStyles.container}
    />
    <hr className={featuredImageStyles.featuredImageRule} />
  </>
)
