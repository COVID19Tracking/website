import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'

const NotFoundPage = ({ data }) => (
  <Layout title="Page not found">
    <div
      className="module-content"
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "page-not-found" } }) {
      edges {
        node {
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
