import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Layout from '../../components/layout'
import Table from '../../components/common/table'
import thousands from '../../utilities/format-thousands'

const USData = ({ data }) => (
  <Table>
    <thead>
      <tr>
        <th>Positive</th>
        <th>Negative</th>
        <th>Positive + Negative</th>
        <th>Pending</th>
        <th>Hospitalized</th>
        <th>Death</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{thousands(data.positive)}</td>
        <td>{thousands(data.negative)}</td>
        <td>{thousands(data.posNeg)}</td>
        <td>{thousands(data.pending)}</td>
        <td>{thousands(data.hospitalized)}</td>
        <td>{thousands(data.death)}</td>
        <td>{thousands(data.total)}</td>
      </tr>
    </tbody>
  </Table>
)

// The top-level content of this page is from 'src/content/snippets/data.md'
export default ({ data }) => (
  <Layout title="Data">
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />
    <USData data={data.allCovidUs.edges[0].node} />
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
  }
`
