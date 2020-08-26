import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout
    title="Data Download"
    path="/data/download"
    returnLinks={[{ link: '/data' }]}
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
      <a href="/data/download/all-states-history.csv">data for all states</a>,
      or just one state:
    </p>
    <ul>
      {data.allCovidStateInfo.nodes.map(state => (
        <li>
          <a href={`/data/download/${state.childSlug.slug}-history.csv`}>
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
        childSlug {
          slug
        }
      }
    }
  }
`
