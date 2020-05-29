import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import ApiExplorer from '~components/pages/data/api/explorer'
import Layout from '../components/layout'

export default ({ data }) => (
  <Layout
    title="Data API"
    path="/api"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <ContentfulContent
      content={
        data.allContentfulSnippet.edges[0].node
          .childContentfulSnippetContentTextNode.childMarkdownRemark.html
      }
      id={data.allContentfulSnippet.edges[0].node.contentful_id}
    />
    <ApiExplorer />
  </Layout>
)

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "api-preamble" } }) {
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
