import React from 'react'
import markdownContentStyles from './markdown-content.module.scss'

export default ({ html }) => (
  <div
    className={markdownContentStyles.content}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)
