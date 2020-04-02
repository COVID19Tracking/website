import React from 'react'
import { graphql } from 'gatsby'
import { DateTime } from 'luxon'
import marked from 'marked'
import Layout from '../components/layout'
import formatDate from '../utilities/format-date'
import thousands from '../utilities/format-thousands'
import { UnstyledList } from '../components/common/lists'
import DetailText from '../components/common/detail-text'
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
        <tr key={`history-${node.dateChecked}`}>
          <td>{formatDate(node.dateChecked)}</td>
          <td>
            <Screenshots date={node.dateChecked} screenshots={screenshots} />
          </td>
          <td>{thousands(node.positive)}</td>
          <td>{thousands(node.negative)}</td>
          <td>{thousands(node.pending)}</td>
          <td>{thousands(node.hospitalized)}</td>
          <td>{thousands(node.death)}</td>
          <td>{thousands(node.totalTestResults)}</td>
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
      <StateGrade letterGrade={summary.grade} />
      {state.notes && (
        <div
          dangerouslySetInnerHTML={{
            __html: marked(state.notes),
          }}
        />
      )}
      <SyncInfobox />
      <SummaryTable data={summary} />
      <DetailText>Last updated {summary.lastUpdateEt}</DetailText>
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
          totalTestResults
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
          totalTestResults
          positive
          pending
          negative
          hospitalized
          death
          dateChecked
        }
      }
    }
    allCovidScreenshot(
      filter: { state: { eq: $state } }
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
