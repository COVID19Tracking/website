import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import Layout from '../components/layout'

const StatePage = ({ data, path }) => {
  const doc = data.contentfulDocument
  return (
    <Layout title={doc.name} path={path} centered>
      <LongContent>
        <ContentfulContent
          content={doc.description.childMarkdownRemark.html}
          id={doc.contentful_id}
        />
      </LongContent>
      <a href={`/document/download/${doc.slug}`}>
        Download <i>{doc.name}</i>
      </a>
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($slug: String!) {
    contentfulDocument(slug: { eq: $slug }) {
      contentful_id
      name
      slug
      description {
        childMarkdownRemark {
          html
        }
      }
      document {
        file {
          url
        }
      }
    }
  }
`
