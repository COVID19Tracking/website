import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '~components/layout'
import Hero from '~components/pages/state/race-ethnicity/hero'
import HistoricalTables from '~components/pages/state/race-ethnicity/historical-tables'

const RaceEthnicityHistoricalTemplate = ({ pageContext, path, data }) => {
  const state = pageContext

  const [currentMetric, setCurrentMetric] = useState('Cases')

  // false: showing numbers, true: showing rates per 100k
  const [usePer100kRate, setUsePer100kRate] = useState(true)

  return (
    <Layout
      title={`${state.name}: Race & Ethnicity Historical Data`}
      returnLinks={[
        {
          link: '/race/dashboard',
          title: 'Racial Data Tracker',
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
        timeSeriesData={data.allCovidRaceDataTimeseries.nodes}
        combinedNotes={data.allCovidRaceDataCombined.nodes}
        separateNotes={data.allCovidRaceDataSeparate.nodes}
      />
      <HistoricalTables
        stateName={state.name}
        timeSeriesData={data.allCovidRaceDataTimeseries.nodes}
        currentMetric={currentMetric}
        setUsePer100kRate={setUsePer100kRate}
        usePer100kRate={usePer100kRate}
      />
    </Layout>
  )
}

export default RaceEthnicityHistoricalTemplate

export const query = graphql`
  query($state: String!) {
    allCovidRaceDataCombined(filter: { state: { eq: $state } }) {
      nodes {
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
        apINote
        otherNote
        lastCheckDate {
          value
        }
        knownRaceEthDeath
        knownRaceEthPos
      }
    }
    allCovidRaceDataSeparate(filter: { state: { eq: $state } }) {
      nodes {
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
        aPINote
        lastCheckDate {
          value
        }
        knownRaceDeath
        knownEthPos
        knownEthDeath
        knownRacePos
      }
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
        Deaths_NHPI
        Deaths_Other
        Deaths_White
        Deaths_Total
        Hosp_AIAN
        Hosp_Asian
        Hosp_Black
        Hosp_Ethnicity_Hispanic
        Hosp_Ethnicity_NonHispanic
        Hosp_Ethnicity_Unknown
        Hosp_LatinX
        Hosp_Multiracial
        Hosp_NHPI
        Hosp_Other
        Hosp_White
        Hosp_Total
        Tests_AIAN
        Tests_Asian
        Tests_Black
        Tests_Ethnicity_Hispanic
        Tests_Ethnicity_NonHispanic
        Tests_Ethnicity_Unknown
        Tests_LatinX
        Tests_Multiracial
        Tests_NHPI
        Tests_Other
        Tests_White
        Tests_Total
      }
    }
  }
`
