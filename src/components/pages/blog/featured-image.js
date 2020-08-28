import React from 'react'
import BlogImage from './blog-image'
import featuredImageStyles from './featured-image.module.scss'

const FeaturedImage = ({ image }) => (
  <div className={featuredImageStyles.container}>
    <BlogImage
      imageSource={image.resize.src}
      imageAlt={image.title}
      caption={image.title}
      containerStyle={featuredImageStyles.image}
    />
  </div>
)

export default FeaturedImage
