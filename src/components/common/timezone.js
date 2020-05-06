import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          inDST
        }
      }
    }
  `)
  const title = data.site.siteMetadata.inDST
    ? 'Eastern Daylight Time'
    : 'Eastern Standard Time'
  const abbreviation = data.site.siteMetadata.inDST ? 'EDT' : 'EST'
  return (
    <abbr title={title} aria-label={title}>
      {abbreviation}
    </abbr>
  )
}
