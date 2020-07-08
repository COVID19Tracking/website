import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import ApiExplorer from '~components/pages/data/api/explorer'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout title="Data API" path="/data/api">
    <LongContent>
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
    </LongContent>
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
  }
`
