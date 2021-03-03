import React from 'react'
import { graphql } from 'gatsby'

import CollapsibleSection from '~components/common/collapsible-section'
import Layout from '~components/layout'
import Container from '~components/common/container'

import Hero from '~components/pages/race/breakouts/hero'

const RaceEthnicityStateTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  return (
    <Layout
      title={`${state.name}: Race & Ethnicity Historical Data`}
      returnLinks={[
        {
          link: '/race/dashboard/',
          title: 'Racial Data Tracker',
        },
      ]}
      path={path}
      description={`Historical time series of race and ethnicity data in ${state.name}.`}
      showWarning
      noContainer
    >
      <Hero
        stateName={state.name}
        stateSlug={slug}
        combinedData={data.covidRaceDataCombined}
        separateData={data.covidRaceDataSeparate}
        combinedTestHosp={data.covidRaceHospTestDataCombined}
        separateTestHosp={data.covidRaceHospTestDataSeparate}
        assessment={data.covidGradeStateAssessment.crdt}
        lastUpdatedByCtp={data.allCovidRaceDataTimeseries.nodes[0].Date}
      />
      <Container centered>
        <CollapsibleSection title="Notes About the Data" open={false}>
          <p>content</p>
        </CollapsibleSection>
        <CollapsibleSection title="Historical Data">
          <p>content</p>
        </CollapsibleSection>
        <CollapsibleSection title="Further Resources">
          <p>content</p>
        </CollapsibleSection>
      </Container>
    </Layout>
  )
}

export default RaceEthnicityStateTemplate

export const query = graphql`
  query($state: String!) {
    allCovidRaceDataTimeseries(
      sort: { order: DESC, fields: Date }
      filter: { State: { eq: $state } }
      limit: 1
    ) {
      nodes {
        Date
      }
    }
    covidGradeStateAssessment {
      crdt
    }
    covidRaceDataCombined(state: { eq: $state }) {
      knownRaceEthDeath
      knownRaceEthPos
      stateUpdate {
        value
      }
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      knownRaceDeath
      knownEthPos
      knownEthDeath
      knownRacePos
      stateUpdate {
        value
      }
    }
    covidRaceHospTestDataCombined(state: { eq: $state }) {
      knownRaceEthHosp
      knownRaceEthTest
      name
    }
    covidRaceHospTestDataSeparate(state: { eq: $state }) {
      knownRaceHosp
      knownRaceTest
      knownEthHosp
      knownEthTest
      name
    }
  }
`
