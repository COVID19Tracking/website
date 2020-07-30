import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import StateNavWrapper from '~components/pages/data/state-nav-wrapper'
import StatePreamble from '~components/pages/state/preamble'
import SummaryCharts from '~components/common/summary-charts'
import StateSummary from '~components/common/summary'
import StateNotes from '~components/pages/state/state-notes'

const StatePage = ({ pageContext, data, path }) => {
  const state = pageContext
  const {
    covidState,
    allCovidStateDaily,
    allCovidStateInfo,
    allCovidUsDaily,
    allContentfulEvent,
    covidRaceDataCombined,
    covidRaceDataSeparate,
    sevenDaysAgo,
  } = data
  return (
    <Layout title={state.name} returnLinks={[{ link: '/data' }]} path={path}>
      <StatePreamble state={state} covidState={covidState} />
      {state.notes && <StateNotes notes={state.notes} />}
      <SummaryCharts
        name={state.name}
        history={allCovidStateDaily.nodes}
        usHistory={allCovidUsDaily.nodes}
        annotations={allContentfulEvent}
      />
      <StateNavWrapper stateList={allCovidStateInfo.nodes} single>
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
      </StateNavWrapper>
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
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        state
        name
        childSlug {
          slug
        }
      }
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
        description {
          description
        }
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
