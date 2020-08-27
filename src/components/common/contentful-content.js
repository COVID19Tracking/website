import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import smartypants from 'smartypants'
import contentfulContentStyles from './contentful-content.module.scss'
import markdwonContentStyles from './markdown-content.module.scss'

export default ({ content, className, id, inline = false }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          contentfulSpace
        }
      }
    }
  `)
  const [isEditable, setIsEditable] = useState(false)
  const { contentfulSpace } = data.site.siteMetadata
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.location !== 'undefined' &&
      window.location.search.search('\\?edit') > -1
    ) {
      setIsEditable(true)
    }
  }, [])
  return (
    <>
      {isEditable && (
        <a
          className={
            inline
              ? contentfulContentStyles.editInline
              : contentfulContentStyles.edit
          }
          href={`https://app.contentful.com/spaces/${contentfulSpace}/entries/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this content
        </a>
      )}
      <div
        className={classnames(className, markdwonContentStyles.content)}
        dangerouslySetInnerHTML={{ __html: smartypants(content, 1) }}
      />
    </>
  )
}
