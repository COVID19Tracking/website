import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const StatePage = ({ data, path }) => {
  const doc = data.contentfulDocument
  return (
    <Layout title={doc.name} path={path} narrow>
      <div
        dangerouslySetInnerHTML={{
          __html: doc.description.childMarkdownRemark.html,
        }}
      />
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
