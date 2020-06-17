import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Panel from '~components/pages/data/download/panel'
import Fields from '~components/pages/data/download/fields'
import DownloadLink from '~components/pages/data/download/download-link'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout
    title="Data Download"
    path="/data/download"
    navigation={data.contentfulNavigationGroup.pages}
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />

    <h2>US History</h2>
    <DownloadLink
      desc="Download all history data"
      path="/api/v1/us/daily.csv"
    />
    <Panel label="Field Descriptions">
      <Fields schema="Us" />
    </Panel>

    <h2>State History</h2>
    <DownloadLink desc="Download all states" path="/api/v1/states/daily.csv" />
    <Panel label="Download single state">
      {data.allCovidStateInfo.nodes.map(({ id, state, name }) => (
        <DownloadLink
          key={id}
          desc={name}
          path={`/api/v1/states/${state.toLowerCase()}/daily.csv`}
        />
      ))}
    </Panel>
    <Panel label="Field Descriptions">
      <Fields schema="States" />
    </Panel>
  </Layout>
)

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "download-page-preamble" }) {
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
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        id
        name
        state
      }
    }
  }
`
