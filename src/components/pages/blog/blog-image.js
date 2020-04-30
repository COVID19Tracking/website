import React from 'react'
import BlogImageStyles from './blog-image.module.scss'

export default ({
  imageSource,
  imageAlt,
  caption,
  containerStyle = BlogImageStyles.container,
}) => (
  <div className={containerStyle}>
    <img src={imageSource} alt={imageAlt} />
    <p>{caption}</p>
  </div>
)
