import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import ContentfulContent from '~components/common/contentful-content'

const NotFoundPage = ({ data }) => (
  <Layout title="Page not found">
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "page-not-found" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
