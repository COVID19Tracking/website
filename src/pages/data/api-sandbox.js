import React from 'react'
import { graphql } from 'gatsby'
import SwaggerSandbox from '../../components/common/swagger-sandbox'
import Layout from '../../components/layout'

export default ({ data }) => (
  <Layout
    title="API Sandbox"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    Below, you can explore each of our endpoints, try out API requests, and
    learn about our schema.
    <SwaggerSandbox />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
      edges {
        node {
          pages {
            ... on ContentfulPage {
              title
              link: slug
            }
            ... on ContentfulNavigationLink {
              title
              link: url
            }
          }
        }
      }
    }
  }
`
