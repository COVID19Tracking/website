import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Panel from '~components/pages/data/download/panel'
import Fields from '~components/pages/data/download/fields'
import DownloadLink from '~components/pages/data/download/download-link'
import Layout from '~components/layout'
import slug from '~utilities/slug'

export default ({ data }) => (
  <Layout
    title="Data Download"
    path="/data/download"
    returnLink="/data"
    returnLinkTitle="Our data"
  >
    <ContentfulContent
      content={
        data.contentfulSnippet.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.contentfulSnippet.contentful_id}
    />

    <h2>State Data</h2>
    <p>
      Download{' '}
      <a href="/data/download/all-states-history.csv">
        all data for all states
      </a>
      , or download all data per state:
    </p>
    <ul>
      {data.allCovidStateInfo.nodes.map(state => (
        <li>
          <a href={`/data/download/${slug(state.name)}-history.csv`}>
            {state.name}
          </a>
        </li>
      ))}
    </ul>
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
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        id
        name
        state
      }
    }
  }
`
