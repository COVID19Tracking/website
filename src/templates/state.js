import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link, graphql } from 'gatsby'
import formatDate from '../utilities/format-date'
import thousands from '../utilities/format-thousands'
import { UnstyledList } from '../components/common/lists'
import marked from 'marked'
import DetailText from '../components/common/detail-text'
import SummaryTable from '../components/common/summary-table'
import BuildTime from '../components/common/build-time'
import Table from '../components/common/table'

const StateLinks = ({ name, twitter, covid19Site, dataSource }) => (
  <UnstyledList>
    {twitter && (
      <li>
        <a href={twitter}>{name} on Twitter</a>
      </li>
    )}
    {covid19Site && (
      <li>
        <a href={covid19Site}>Best current data source</a>
      </li>
    )}
    {dataSource && (
      <li>
        <a href={dataSource}>Data source</a>
      </li>
    )}
  </UnstyledList>
)

const StateHistory = ({ history }) => (
  <Table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Screenshot</th>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Hospitalized</th>
        <th scope="col">Deaths</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody>
      {history.map(({ node }) => (
        <tr key={`history-${node.date}`}>
          <td>{formatDate(node.date)}</td>
          <td></td>
          <td>{thousands(node.positive)}</td>
          <td>{thousands(node.negative)}</td>
          <td>{thousands(node.pending)}</td>
          <td>{thousands(node.hospitalized)}</td>
          <td>{thousands(node.death)}</td>
          <td>{thousands(node.total)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

const StatePage = ({ pageContext, data }) => {
  const state = pageContext
  const summary = data.allCovidState.edges[0].node
  return (
    <Layout title={state.name}>
      <h1>{state.name}</h1>
      <StateLinks {...state} />
      <div
        dangerouslySetInnerHTML={{
          __html: marked(state.notes),
        }}
      />
      <BuildTime />
      <SummaryTable data={summary} />
      <DetailText>Last updated {summary.lastUpdateEt}</DetailText>
      <h2>History</h2>
      <StateHistory history={data.allCovidStateDaily.edges} />
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($state: String!) {
    allCovidState(sort: {}, filter: { state: { eq: $state } }) {
      edges {
        node {
          total
          state
          score
          positive
          pending
          negative
          lastUpdateEt
          hospitalized
          grade
          death
        }
      }
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          total
          positive
          pending
          negative
          hospitalized
          death
          dateChecked
        }
      }
    }
  }
`
