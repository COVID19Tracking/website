import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import smartypants from 'smartypants'
import Layout from '~components/layout'
import Container from '~components/common/container'
import MarkdownContent from '~components/common/markdown-content'
import SummaryCharts from '~components/common/summary-charts'
import StateGrade from '~components/pages/state/state-grade'
import StateHistory from '~components/pages/state/state-history'
import StateLinks from '~components/pages/state/state-links'
import SummaryTable from '~components/common/summary-table'
import { SyncInfobox } from '~components/common/infobox'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const {
    covidState,
    allCovidStateDaily,
    allCovidScreenshot,
    allCovidUsDaily,
    allContentfulEvent,
  } = data
  return (
    <Layout title={state.name} returnLink="/data" path={path}>
      <StateLinks
        twitter={state.twitter}
        covid19Site={state.covid19Site}
        covid19SiteSecondary={state.covid19SiteSecondary}
        stateName={state.name}
        fathomGoal="DNRI0GQP"
      />
      <StateGrade letterGrade={covidState.dataQualityGrade} />
      {state.notes && (
        <Container narrow>
          <MarkdownContent html={smartypants(marked(state.notes))} />
        </Container>
      )}
      <SyncInfobox />
      <SummaryTable data={covidState} lastUpdated={covidState.lastUpdateEt} />
      <SummaryCharts
        name={state.name}
        history={allCovidStateDaily.nodes}
        usHistory={allCovidUsDaily.nodes}
        annotations={allContentfulEvent}
      />
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
    allCovidUsDaily {
      nodes {
        totalTestResults
        totalTestResultsIncrease
        positive
        positiveIncrease
        pending
        negative
        hospitalized
        hospitalizedIncrease
        hospitalizedCurrently
        death
        deathIncrease
        date
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
    covidState(state: { eq: $state }) {
      positive
      negative
      lastUpdateEt
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
        positiveIncrease
        pending
        negative
        hospitalized
        hospitalizedCurrently
        hospitalizedIncrease
        death
        deathIncrease
        date
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
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
    allContentfulEvent(
      filter: {
        state: { elemMatch: { code: { eq: $state } } }
        displayStateChart: { eq: true }
      }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        title
        date(formatString: "YYYYMMDD")
        dataElement
        contentful_id
        childContentfulEventDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
