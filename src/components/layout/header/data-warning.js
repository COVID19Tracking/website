import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import dataWarningStyle from './thanksgiving-warning.module.scss'

const DataWarning = () => {
  const data = useStaticQuery(graphql`
    {
      contentfulSnippet(slug: { eq: "data-warning" }) {
        contentful_id
        name
        content {
          content
        }
      }
    }
  `)
  if (
    !data ||
    !data.contentfulSnippet ||
    !data.contentfulSnippet.content.content.trim().length
  ) {
    return null
  }
  return (
    <div className={dataWarningStyle.warning}>
      <Container>
        {marked.inlineLexer(data.contentfulSnippet.content.content, [])}
      </Container>
    </div>
  )
}

export default DataWarning
