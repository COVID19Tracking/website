import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '../components/layout'

const NotFoundPage = ({ data }) => (
  <Layout title="Page not found">
    <ContentfulContent
      className="module-content"
      content={
        data.allContentfulSnippet.edges[0].node
          .childContentfulSnippetContentTextNode.childMarkdownRemark.html
      }
      id={data.allContentfulSnippet.edges[0].node.contentful_id}
    />
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "page-not-found" } }) {
      edges {
        node {
          contentful_id
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
