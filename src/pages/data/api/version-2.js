import React from 'react'
import { graphql } from 'gatsby'
import ChangeLog from '~components/pages/data/api/change-log'
import ContentfulContent from '~components/common/contentful-content'
import ApiExplorer2 from '~components/pages/data/api/explorer-2'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'

const DataApiPage = ({ data }) => {
  return (
    <Layout title="Data API" path="/data/api" showWarning>
      <LongContent>
        <ChangeLog />
        <ContentfulContent
          content={
            data.contentfulSnippet.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentfulSnippet.contentful_id}
        />
      </LongContent>
      <ApiExplorer2 />
    </Layout>
  )
}

export default DataApiPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "api-preamble-version-2" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
