import React from 'react'
import { graphql } from 'gatsby'
import DataSummary from '~components/pages/about-data/data-summary'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

const DataSummaryPage = ({ data }) => (
  <Layout title="Data Summary" centered>
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />
    <DataSummary />
  </Layout>
)

export default DataSummaryPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "data-summary-lede" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
