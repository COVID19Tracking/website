import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import ApiExplorer from '~components/pages/data/api/explorer'
import Layout from '../components/layout'

export default ({ data }) => (
  <Layout
    title="Data API"
    path="/api"
    navigation={data.contentfulNavigationGroup.pages}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <ApiExplorer />
  </Layout>
)

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "api-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    contentfulNavigationGroup(slug: { eq: "data" }) {
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
`
