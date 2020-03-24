import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../../components/layout'
import BuildTime from '../../components/common/build-time'
import slug from '../../utilities/slug'
import SummaryTable from '../../components/common/summary-table'

const StateList = ({ states }) => (
  <ul>
    {states.map(({ node }) => (
      <li key={`state-${node.state}`}>
        <Link to={`/data/state/${slug(node.name)}`}>{node.name}</Link>
      </li>
    ))}
  </ul>
)

// The top-level content of this page is from 'src/content/snippets/data.md'
export default ({ data }) => (
  <Layout title="Data">
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />
    <BuildTime />
    <SummaryTable data={data.allCovidUs.edges[0].node} />
    <h2>States</h2>
    <StateList states={data.allCovidStateInfo.edges} />
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { eq: "/data/" }, isPage: { eq: false } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
        }
      }
    }
    allCovidUs {
      edges {
        node {
          death
          negative
          positive
          posNeg
          hospitalized
          total
        }
      }
    }
    allCovidStateInfo(sort: { fields: state }) {
      edges {
        node {
          name
          state
        }
      }
    }
  }
`
