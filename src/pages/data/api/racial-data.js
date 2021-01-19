import React from 'react'
import { graphql } from 'gatsby'
import ChangeLog from '~components/pages/data/api/change-log'
import ContentfulContent from '~components/common/contentful-content'
import CrdtExplorer from '~components/pages/data/api/crdt-explorer'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'

const DataApiPage = ({ data }) => {
  return (
    <Layout
      title="COVID Racial Data API"
      path="/data/api/racial-data"
      showWarning
    >
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
      <h2>API domain name</h2>
      <p>
        All API requests should be made to:{' '}
        <strong>
          <code>https://api.covidtracking.com</code>
        </strong>
      </p>
      <CrdtExplorer />
    </Layout>
  )
}

export default DataApiPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "crdt-api-lede" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
