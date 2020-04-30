import React from 'react'
import BlogImage from './blog-image'
import ImageContentBlockStyles from './image-content-block.module.scss'

export default ({ image, caption }) => (
  <BlogImage
    imageSource={image['en-US'].fields.file['en-US'].url}
    imageAlt={image['en-US'].fields.title['en-US']}
    caption={caption['en-US']}
    containerStyle={ImageContentBlockStyles.container}
  />
)
