import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '~components/layout'
import Hero from '~components/pages/state/race-ethnicity/hero'
import HistoricalTables from '~components/pages/state/race-ethnicity/historical-tables'

const RaceEthnicityHistoricalTemplate = ({ pageContext, path, data }) => {
  const state = pageContext

  const [currentMetric, setCurrentMetric] = useState('Cases')

  // false: showing numbers, true: showing rates per 100k
  const [usePer100kRate, setUsePer100kRate] = useState(false)

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
      />
      <HistoricalTables
        timeSeriesData={data.allCovidRaceDataTimeseries.nodes}
        currentMetric={currentMetric}
      />
    </Layout>
  )
}

export default RaceEthnicityHistoricalTemplate

export const query = graphql`
  query($state: String!) {
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
        Cases_Total
        Date
        Deaths_AIAN
        Deaths_Asian
        Deaths_Black
        Deaths_Ethnicity_Hispanic
        Deaths_Ethnicity_NonHispanic
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
