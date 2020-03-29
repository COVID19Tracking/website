import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Layout from '../../components/layout'
import { SyncInfobox } from '../../components/common/infobox'

const ContentPage = ({ data }) => (
  <Layout
    title="US Historical Data"
    navigation={data.allNavigationYaml.edges[0].node.items}
  >
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />

    <SyncInfobox />

    <div className="us-days">
      <div className="table-scroll">
        <table className="day-table">
          <caption>US Daily Cumulative Totals - 4 pm ET</caption>
          <thead>
            <tr>
              <th scope="col" className="text-left">
                Date
              </th>
              <th scope="col">States Tracked</th>
              <th scope="col">Positive</th>
              <th scope="col">Negative</th>
              <th scope="col">Pos + Neg</th>
              <th scope="col">Pending</th>
              <th scope="col">Hospitalized</th>
              <th scope="col">Deaths</th>
              <th scope="col">Total Tests</th>
            </tr>
          </thead>
          <tbody>
            {data.allCovidUsDaily.edges.map(({ node }) => (
              <tr>
                <td className="text-left">
                  {DateTime.fromFormat(
                    node.date.toString(),
                    'yyyyMMdd',
                  ).toFormat('dd LLL yyyy ccc')}
                </td>
                <td>{node.states}</td>
                <td>{node.positive.toLocaleString()}</td>
                <td>{node.negative.toLocaleString()}</td>
                <td>{node.posNeg.toLocaleString()}</td>
                <td>{node.pending.toLocaleString()}</td>
                <td>
                  {node.hospitalized
                    ? node.hospitalized.toLocaleString()
                    : 'N/A'}
                </td>
                <td>{node.death ? node.death.toLocaleString() : 'N/A'}</td>
                <td>{node.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
)

export default ContentPage

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { eq: "/us-daily/" }, isPage: { eq: false } } }
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
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      edges {
        node {
          total
          states
          positive
          pending
          posNeg
          negative
          hospitalized
          death
          date
        }
      }
    }
    allNavigationYaml(filter: { name: { eq: "data" } }) {
      edges {
        node {
          name
          items {
            title
            link
          }
        }
      }
    }
  }
`
