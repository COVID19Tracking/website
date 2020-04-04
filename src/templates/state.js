import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import marked from 'marked'
import Layout from '../components/layout'
import formatDate from '../utilities/format-date'
import formatNumber from '../utilities/format-number'
import { UnstyledList } from '../components/common/lists'
import StateGrade from '../components/common/state-grade'
import SummaryTable from '../components/common/summary-table'
import { SyncInfobox } from '../components/common/infobox'
import Table from '../components/common/table'
import '../scss/templates/state.scss'

const StateLinks = ({ name, twitter, covid19Site, dataSource }) => (
  <UnstyledList>
    {twitter && (
      <li>
        <a href={`https://twitter.com/${twitter}`}>{name} on Twitter</a>
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

const Screenshots = ({ date, screenshots }) => {
  const dateScreenshots = []
  const currentDate = DateTime.fromISO(date)
  screenshots.forEach(({ node }) => {
    if (DateTime.fromISO(node.dateChecked).hasSame(currentDate, 'day')) {
      dateScreenshots.push(node)
    }
  })
  if (dateScreenshots.length === 0) {
    return null
  }
  return (
    <ul>
      {dateScreenshots.map(screenshot => (
        <li key={screenshot.url}>
          <a href={screenshot.url} target="_blank" rel="noopener noreferrer">
            {screenshot.dateChecked && (
              <>
                {DateTime.fromISO(screenshot.dateChecked)
                  .toFormat('h:mm a')
                  .toLowerCase()}
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

const StateHistory = ({ history, screenshots }) => (
  <Table className="state-historical">
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
        <th scope="col">Screenshots</th>
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
      {history.map(({ node }) => (
        <tr key={`history-${node.dateChecked}`}>
          <td>{formatDate(node.dateChecked)}</td>
          <td>
            <Screenshots date={node.dateChecked} screenshots={screenshots} />
          </td>
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
  </Table>
)

const StatePage = ({ pageContext, data }) => {
  const state = pageContext
  const summary = data.allCovidState.edges[0].node
  return (
    <Layout title={state.name}>
      <StateLinks {...state} />
      <StateGrade letterGrade={summary.grade} />
      {state.notes && (
        <div
          dangerouslySetInnerHTML={{
            __html: marked(state.notes),
          }}
        />
      )}
      <SyncInfobox />
      <SummaryTable data={summary} lastUpdated={summary.lastUpdateEt} />
      <h2 id="historical">History</h2>
      <StateHistory
        history={data.allCovidStateDaily.edges}
        screenshots={data.allCovidScreenshot.edges}
      />
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($state: String!) {
    allCovidState(sort: {}, filter: { state: { eq: $state } }) {
      edges {
        node {
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
          lastUpdateEt
          grade
        }
      }
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          dateChecked
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
    allCovidScreenshot(
      filter: { state: { eq: $state }, secondary: { eq: false } }
      sort: { fields: dateChecked, order: DESC }
    ) {
      edges {
        node {
          size
          url
          state
          dateChecked
        }
      }
    }
  }
`
