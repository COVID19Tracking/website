import React from 'react'
import ImageContentBlockStyles from './image-content-block.module.scss'

export default ({ image, caption }) => (
  <div className={ImageContentBlockStyles.container}>
    <img
      src={image['en-US'].fields.file['en-US'].url}
      alt={image['en-US'].fields.title['en-US']}
    />
    <p>{caption['en-US']}</p>
  </div>
)
