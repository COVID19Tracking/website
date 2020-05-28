import React from 'react'
import BlogImage from '~components/pages/blog/blog-image'
import featuredImageStyles from '~components/pages/blog/featured-image.module.scss'

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
