import React from 'react'
import BlogImage from './blog-image'
import featuredImageStyles from './featured-image.module.scss'

export default ({ image }) => (
  <>
    <BlogImage
      imageSource={image.resize.src}
      imageAlt={image.title}
      caption={image.title}
    />
    <hr className={featuredImageStyles.featuredImageRule} />
  </>
)
