import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import StateNavWrapper from '~components/pages/data/state-nav-wrapper'
import StatePreamble from '~components/pages/state/preamble'
import SummaryCharts from '~components/pages/data/summary-charts'
import StateSummary from '~components/pages/data/summary'
import StateNotes from '~components/pages/state/state-notes'
import StateTweets from '~components/pages/state/state-tweets'

const StateTemplate = ({ pageContext, data, path }) => {
  const state = pageContext
  const {
    covidState,
    allCovidStateDaily,
    allCovidStateInfo,
    covidStateInfo,
    allCovidUsDaily,
    allContentfulChartAnnotation,
    sevenDaysAgo,
    contentfulStateOrTerritory,
    allTweets,
    allCovidAnnotation,
  } = data
  return (
    <Layout title={state.name} returnLinks={[{ link: '/data' }]} path={path}>
      <StatePreamble state={state} covidState={covidState} />
      {state.notes && <StateNotes notes={state.notes} />}
      <SummaryCharts
        name={state.name}
        history={allCovidStateDaily.nodes}
        usHistory={allCovidUsDaily.nodes}
        annotations={allContentfulChartAnnotation}
        testSource={
          covidStateInfo.covidTrackingProjectPreferredTotalTestField ===
          'posNeg'
            ? 'totalTestResults'
            : covidStateInfo.covidTrackingProjectPreferredTotalTestField
        }
        testUnits={covidStateInfo.covidTrackingProjectPreferredTotalTestUnits}
      />
      <StateNavWrapper stateList={allCovidStateInfo.nodes} single>
        <StateSummary
          sevenDaysAgo={sevenDaysAgo}
          stateSlug={state.slug}
          data={covidState}
          population={covidStateInfo.childPopulation.population}
          metadata={contentfulStateOrTerritory}
          lastUpdated={covidState.lastUpdateEt}
          annotations={allCovidAnnotation.nodes}
        />
        <StateTweets tweets={allTweets} name={state.name} />
      </StateNavWrapper>
    </Layout>
  )
}

export default StateTemplate

export const query = graphql`
  query($state: String!, $sevenDaysAgo: Date, $nameRegex: String!) {
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
    covidStateInfo(state: { eq: $state }) {
      state
      covidTrackingProjectPreferredTotalTestField
      covidTrackingProjectPreferredTotalTestUnits
      childPopulation {
        population
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
        date(formatString: "YYYYMMDD")
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
      state
      positive
      positiveIncrease
      negative
      lastUpdateEt
      dateModified(formatString: "MMM D, YYYY h:mm a")
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
      dataQualityGrade
      posNeg
      probableCases
      positiveCasesViral
      positiveTestsViral
      negativeTestsViral
      totalTestsPeopleViral
      totalTestsViral
      totalTestEncountersViral
      totalTestsAntibody
      totalTestResultsSource
    }
    allCovidStateDaily(
      filter: { state: { eq: $state } }
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        totalTestResults
        totalTestEncountersViral
        totalTestEncountersViralIncrease
        totalTestsViralIncrease
        totalTestsPeopleViralIncrease
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
        date(formatString: "YYYYMMDD")
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
          totalTestEncountersViralIncrease {
            percent
          }
          totalTestsViralIncrease {
            percent
          }
          totalTestsPeopleViralIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
    contentfulStateOrTerritory(code: { eq: $state }) {
      testUnitsUnknown
    }
    allContentfulChartAnnotation(
      filter: { state: { code: { eq: $state } } }
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
        childContentfulChartAnnotationDescriptionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allTweets(
      filter: { full_text: { regex: $nameRegex } }
      sort: { fields: date, order: DESC }
      limit: 5
    ) {
      nodes {
        full_text
        id_str
        date(formatString: "MMMM D yyyy")
      }
    }
    allCovidAnnotation(filter: { state: { eq: $state } }) {
      nodes {
        state
        metric
        type
        field
        annotations {
          evidence
          evidence_source
          summary
          type
          definitions {
            definition
            name
            type
          }
        }
      }
    }
  }
`
