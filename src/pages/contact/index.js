import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import ListArrow from '../../components/common/list-arrow'

export default ({ data }) => (
  <Layout title="Contact" narrow textHeavy>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <ListArrow
      items={[
        <p>
          <Link to="/contact/accessibility">
            Report a problem with accessibility on the website.
          </Link>
        </p>,
      ]}
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
