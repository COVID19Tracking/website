import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import contentfulContentStyles from './contentful-content.module.scss'

export default ({ content, className, id }) => {
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
  useEffect(() => {
    if (
      typeof document !== 'undefined' &&
      typeof document.cookie !== 'undefined' &&
      document.cookie.search('inEdit=true') > -1
    ) {
      setIsEditable(true)
    }
  }, [])
  return (
    <>
      {isEditable && (
        <a
          className={contentfulContentStyles.edit}
          href={`https://app.contentful.com/spaces/${data.site.siteMetadata.contentfulSpace}/entries/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this content
        </a>
      )}
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}
