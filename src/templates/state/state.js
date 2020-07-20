import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '~components/layout'
import StateGrade from '~components/pages/state/state-grade'
import StateLinks from '~components/pages/state/state-links'
import StateNotes from '~components/pages/state/state-notes'
import SummaryCharts from '~components/common/summary-charts'
import StateSummary from '~components/common/state/summary'
import { SyncInfobox } from '~components/common/infobox'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const {
    covidState,
    allCovidStateDaily,
    allCovidUsDaily,
    allContentfulEvent,
    covidRaceDataCombined,
    covidRaceDataSeparate,
    sevenDaysAgo,
  } = data
  return (
    <Layout title={state.name} returnLink="/data" path={path}>
      <StateLinks
        twitter={state.twitter}
        covid19Site={state.covid19Site}
        covid19SiteSecondary={state.covid19SiteSecondary}
        covid19SiteTertiary={state.covid19SiteTertiary}
        stateName={state.name}
        fathomGoal="DNRI0GQP"
      />
      <StateGrade letterGrade={covidState.dataQualityGrade} />
      <Link to={`${path}/screenshots`}>Screenshots</Link>{' '}
      <Link to={`${path}/history`}>full history</Link>
      {state.notes && <StateNotes notes={state.notes} />}
      <SyncInfobox />
      <StateSummary
        sevenDaysAgo={sevenDaysAgo}
        stateSlug={state.slug}
        data={covidState}
        raceData={{
          combined: covidRaceDataCombined,
          separate: covidRaceDataSeparate,
        }}
        lastUpdated={covidState.lastUpdateEt}
      />
      <SummaryCharts
        name={state.name}
        history={allCovidStateDaily.nodes}
        usHistory={allCovidUsDaily.nodes}
        annotations={allContentfulEvent}
      />
    </Layout>
  )
}

export default StatePage

export const query = graphql`
  query($state: String!, $sevenDaysAgo: Int) {
    sevenDaysAgo: covidStateDaily(
      date: { eq: $sevenDaysAgo }
      state: { eq: $state }
    ) {
      positive
    }
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
      positiveIncrease
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
      deathProbable
      deathConfirmed
      totalTestResults
      dateModified
      dataQualityGrade
      posNeg
      positiveCasesViral
      positiveTestsViral
      totalTestsViral
      negativeTestsViral
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
    covidRaceDataCombined(state: { eq: $state }) {
      knownRaceEthDeath
      knownRaceEthPos
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      knownEthDeath
      knownEthPos
      knownRaceDeath
      knownRacePos
    }
  }
`
