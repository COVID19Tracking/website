import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import smartypants from 'smartypants'
import Layout from '~components/layout'
import MarkdownContent from '~components/common/markdown-content'
import StateGrade from '~components/pages/state/state-grade'
import StateHistory from '~components/pages/state/state-history'
import StateLinks from '~components/pages/state/state-links'
import SummaryTable from '~components/common/summary-table'
import { SyncInfobox } from '~components/common/infobox'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const { covidState, allCovidStateDaily, allCovidScreenshot } = data
  return (
    <Layout title={state.name} returnLink="/data" path={path}>
      <StateLinks
        twitter={state.twitter}
        covid19Site={state.covid19Site}
        covid19SiteSecondary={state.covid19SiteSecondary}
        stateName={state.name}
      />
      <StateGrade letterGrade={covidState.dataQualityGrade} />
      {state.notes && (
        <MarkdownContent html={smartypants(marked(state.notes))} />
      )}
      <SyncInfobox />
      <SummaryTable data={covidState} lastUpdated={covidState.dateModified} />
      <h2 id="historical">History</h2>
      <StateHistory
        history={allCovidStateDaily.nodes}
        screenshots={allCovidScreenshot.nodes}
      />
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($state: String!) {
    covidState(state: { eq: $state }) {
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
      dateModified
      dataQualityGrade
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        totalTestResults
        totalTestResultsIncrease
        positive
        pending
        negative
        hospitalized
        death
        date
      }
    }
    allCovidScreenshot(
      filter: {
        state: { eq: $state }
        secondary: { eq: false }
        tertiary: { eq: false }
      }
      sort: { fields: dateChecked }
    ) {
      nodes {
        size
        url
        state
        date
        dateChecked
      }
    }
  }
`
