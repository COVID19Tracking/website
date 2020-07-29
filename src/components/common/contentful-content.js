import React from 'react'
import classnames from 'classnames'
import smartypants from 'smartypants'
import contentfulContentStyles from './contentful-content.module.scss'
import markdwonContentStyles from './markdown-content.module.scss'

import ContentfulRawContent from './contentful-raw-content'

export default ({ content, className, id }) => {
  return (
    <ContentfulRawContent
      id={id}
      editClassName={contentfulContentStyles.edit}
      content={
        <div
          className={classnames(className, markdwonContentStyles.content)}
          dangerouslySetInnerHTML={{ __html: smartypants(content, 1) }}
        />
      }
    />
  )
}
