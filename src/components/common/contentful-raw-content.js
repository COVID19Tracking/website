import React, { useEffect, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import contentfulContentStyles from './contentful-content.module.scss'

export default ({
  content,
  id,
  editClassName = contentfulContentStyles.editRaw,
}) => {
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
          className={editClassName}
          href={`https://app.contentful.com/spaces/${data.site.siteMetadata.contentfulSpace}/entries/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this content
        </a>
      )}
      {content}
    </>
  )
}
