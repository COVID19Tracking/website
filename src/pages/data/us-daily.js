import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import Layout from '../../components/layout'
import DetailText from '../../components/common/detail-text'
import formatNumber from '../../utilities/format-number'
import { SyncInfobox } from '../../components/common/infobox'

const UsDailyPage = ({ data }) => (
  <Layout
    title="US Historical Data"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.usDailyPreamble.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />

    <SyncInfobox />

    <DetailText>
      <span
        dangerouslySetInnerHTML={{
          __html:
            data.dataSummaryFootnote.nodes[0].content.childMarkdownRemark.html,
        }}
      />
    </DetailText>

    <div className="us-days">
      <div className="table-scroll">
        <table className="day-table">
          <caption>US Daily Cumulative Totals - 4 pm ET</caption>
          <col />
          <col />
          <colgroup span="3" />
          <colgroup span="2" />
          <colgroup span="2" />
          <colgroup span="2" />
          <col />
          <col />
          <col />
          <col />
          <thead>
            <tr>
              <td />
              <td />
              <th scope="colgroup" colSpan="3">
                Tests
              </th>
              <th scope="colgroup" colSpan="2">
                Hospitalized
              </th>
              <th scope="colgroup" colSpan="2">
                In ICU
              </th>
              <th scope="colgroup" colSpan="2">
                On Ventilator
              </th>
              <td colSpan="3"> </td>
            </tr>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">States</th>
              <th scope="col">Positive</th>
              <th scope="col">Negative</th>
              <th scope="col">Pending</th>
              <th scope="col">Currently</th>
              <th scope="col">Cumulative</th>
              <th scope="col">Currently</th>
              <th scope="col">Cumulative</th>
              <th scope="col">Currently</th>
              <th scope="col">Cumulative</th>
              <th scope="col">Recovered</th>
              <th scope="col">Deaths</th>
              <th scope="col">
                Total test results <span>(Positive + Negative)</span>
              </th>
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
                <td>{formatNumber(node.positive)}</td>
                <td>{formatNumber(node.negative)}</td>
                <td>{formatNumber(node.pending)}</td>
                <td>{formatNumber(node.hospitalizedCurrently)}</td>
                <td>{formatNumber(node.hospitalizedCumulative)}</td>
                <td>{formatNumber(node.inIcuCurrently)}</td>
                <td>{formatNumber(node.inIcuCumulative)}</td>
                <td>{formatNumber(node.onVentilatorCurrently)}</td>
                <td>{formatNumber(node.onVentilatorCumulative)}</td>
                <td>{formatNumber(node.recovered)}</td>
                <td>{formatNumber(node.death)}</td>
                <td>{formatNumber(node.totalTestResults)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
)

export default UsDailyPage

export const query = graphql`
  query {
    dataSummaryFootnote: allContentfulSnippet(
      filter: { name: { eq: "Data summary footnote" } }
    ) {
      nodes {
        id
        name
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    usDailyPreamble: allContentfulSnippet(
      filter: { slug: { eq: "us-daily" } }
    ) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      edges {
        node {
          date
          states
          positive
          negative
          pending
          hospitalizedCurrently
          hospitalizedCumulative
          inIcuCurrently
          inIcuCumulative
          recovered
          onVentilatorCurrently
          onVentilatorCumulative
          death
          totalTestResults
        }
      }
    }
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
      edges {
        node {
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
      }
    }
  }
`
