import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '~components/layout'
import Hero from '~components/pages/state/race-ethnicity/hero'
import HistoricalTables from '~components/pages/state/race-ethnicity/historical-tables'
import { addPer100kValues } from '~components/pages/state/race-ethnicity/utils'

const RaceEthnicityStateTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  const [currentMetric, setCurrentMetric] = useState('Cases')

  // false: showing numbers, true: showing rates per 100k
  const [usePer100kRate, setUsePer100kRate] = useState(true)

  const populationData = data.covidAcsPopulation
  const timeSeriesData = data.allCovidRaceDataTimeseries.nodes

  // includes per cap values
  const completeTimeSeriesData =
    populationData === null
      ? timeSeriesData
      : addPer100kValues(timeSeriesData, populationData)

  return (
    <Layout
      title={`${state.name}: Race & Ethnicity Historical Data`}
      returnLinks={[
        {
          link: '/data',
          title: 'Our Data',
        },
        {
          link: `/data/state/${slug}`,
          title: state.name,
        },
      ]}
      path={path}
      description={`Historical time series of race and ethnicity data in ${state.name}.`}
      showWarning
    >
      <Hero
        stateName={state.name}
        stateSlug={state.childSlug.slug}
        stateAbbreviation={state.state}
        currentMetric={currentMetric}
        setCurrentMetric={setCurrentMetric}
        usePer100kRate={usePer100kRate}
        setUsePer100kRate={setUsePer100kRate}
        timeSeriesData={timeSeriesData}
        completeTimeSeriesData={completeTimeSeriesData}
        combinedNotes={data.covidRaceDataCombined}
        separateNotes={data.covidRaceDataSeparate}
        combinedTestHosp={data.covidRaceHospTestDataCombined}
        separateTestHosp={data.covidRaceHospTestDataSeparate}
        stateSources={data.covidRaceDataSources}
      />
      <HistoricalTables
        stateName={state.name}
        timeSeriesData={timeSeriesData}
        completeTimeSeriesData={completeTimeSeriesData}
        populationData={populationData}
        currentMetric={currentMetric}
        setUsePer100kRate={setUsePer100kRate}
        usePer100kRate={usePer100kRate}
      />
    </Layout>
  )
}

export default RaceEthnicityStateTemplate

export const query = graphql`
  query($state: String!) {
    covidRaceDataCombined(state: { eq: $state }) {
      name
      latinxNote
      mutExclNote
      popTableNote
      smallNNote
      blackSmallN
      asianSmallN
      aianSmallN
      nhpiSmallN
      whiteSmallN
      latinXSmallN
      apiNote
      otherNote
      historicalSmallNNote
      lastCheckDate {
        value
      }
      stateUpdate {
        value
      }
      knownRaceEthDeath
      knownRaceEthPos
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      name
      latinxNote
      mutExclNote
      popTableNote
      smallNNote
      blackSmallN
      asianSmallN
      aianSmallN
      nhpiSmallN
      whiteSmallN
      latinXSmallN
      otherNote
      apiNote
      historicalSmallNNote
      lastCheckDate {
        value
      }
      stateUpdate {
        value
      }
      knownRaceDeath
      knownEthPos
      knownEthDeath
      knownRacePos
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
    covidRaceDataSources(state: { eq: $state }) {
      sourcePrimary
      sourceSecondary
      sourceTertiary
      sourceQuaternary
    }
    covidAcsPopulation(state: { eq: $state }) {
      aian
      asian
      black
      hisp
      nhpi
      notHisp
      other
      total
      type
      twoOrMore
      white
    }
    allCovidRaceDataTimeseries(
      filter: { Date: { ne: null }, State: { eq: $state } }
    ) {
      nodes {
        Cases_Asian
        Cases_AIAN
        Cases_Black
        Cases_White
        Cases_Other
        Cases_NHPI
        Cases_Multiracial
        Cases_Unknown
        Cases_LatinX
        Cases_Ethnicity_NonHispanic
        Cases_Ethnicity_Hispanic
        Cases_Ethnicity_Unknown
        Cases_Total
        Date
        Deaths_AIAN
        Deaths_Asian
        Deaths_Black
        Deaths_Ethnicity_Hispanic
        Deaths_Ethnicity_NonHispanic
        Deaths_Ethnicity_Unknown
        Deaths_LatinX
        Deaths_Multiracial
        Deaths_Unknown
        Deaths_NHPI
        Deaths_Other
        Deaths_White
        Deaths_Total
        Hospitalizations_AIAN: Hosp_AIAN
        Hospitalizations_Asian: Hosp_Asian
        Hospitalizations_Black: Hosp_Black
        Hospitalizations_Ethnicity_Hispanic: Hosp_Ethnicity_Hispanic
        Hospitalizations_Ethnicity_NonHispanic: Hosp_Ethnicity_NonHispanic
        Hospitalizations_Ethnicity_Unknown: Hosp_Ethnicity_Unknown
        Hospitalizations_LatinX: Hosp_LatinX
        Hospitalizations_Unknown: Hosp_Unknown
        Hospitalizations_Multiracial: Hosp_Multiracial
        Hospitalizations_NHPI: Hosp_NHPI
        Hospitalizations_Other: Hosp_Other
        Hospitalizations_White: Hosp_White
        Hospitalizations_Total: Hosp_Total
        Tests_AIAN
        Tests_Asian
        Tests_Black
        Tests_Ethnicity_Hispanic
        Tests_Ethnicity_NonHispanic
        Tests_Ethnicity_Unknown
        Tests_LatinX
        Tests_Unknown
        Tests_Multiracial
        Tests_NHPI
        Tests_Other
        Tests_White
        Tests_Total
      }
    }
  }
`
