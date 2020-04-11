import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Layout from '../components/layout'
import StateGrade from '../components/common/state-grade'
import StatePopulation from '../components/pages/state/state-population'
import StateHistory from '../components/pages/state/state-history'
import StateLinks from '../components/pages/state/state-links'
import SummaryTable from '../components/common/summary-table'
import { SyncInfobox } from '../components/common/infobox'

const StatePage = ({ pageContext, data }) => {
  const state = pageContext
  const summary = data.allCovidState.edges[0].node
  const { population } = data.allPopulationJson.edges[0].node
  return (
    <Layout title={state.name}>
      <StateLinks {...state} />
      <StatePopulation population={population} />
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
          totalTestResults
          totalTestResultsIncrease
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
    allPopulationJson(filter: { state: { eq: $state } }) {
      edges {
        node {
          population
        }
      }
    }
  }
`
