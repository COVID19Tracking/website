import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

export default ({ data }) => (
  <Layout title="Contact" narrow textHeavy>
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

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "contact-page" } }) {
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
