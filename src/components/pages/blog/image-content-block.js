import React from 'react'
import BlogImage from './blog-image'

export default ({ image, caption }) => (
  <BlogImage
    imageSource={image['en-US'].fields.file['en-US'].url}
    imageAlt={image['en-US'].fields.title['en-US']}
    caption={caption && caption['en-US']}
  />
)
