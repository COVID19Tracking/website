import React, { useState } from 'react'
import { graphql } from 'gatsby'

import CollapsibleSection from '~components/common/collapsible-section'
import Layout from '~components/layout'
import Container from '~components/common/container'
import { CtaLink } from '~components/common/call-to-action'

import Hero from '~components/pages/race/breakouts/hero'
import CumulativeNotes from '~components/pages/race/breakouts/cumulative-notes'
import FurtherResources from '~components/pages/race/breakouts/further-resources'

import { StateRaceBarCharts } from '~components/social-media-graphics/race/social-card'

import { Notes } from '~components/pages/state/race-ethnicity/notes-and-downloads'
import SelectorAndCharts from '~components/pages/state/race-ethnicity/selector-and-charts'
import { addPer100kValues } from '~components/pages/state/race-ethnicity/utils'
import { SeparateTableAndNotes } from '~components/pages/race/state-separate'
import { CombinedTableAndNotes } from '~components/pages/race/state-combined'

import styles from './index.module.scss'

const getAvailableMetrics = (isCombined, coreData, testHospData) => {
  const metrics = []

  if (isCombined) {
    if (testHospData.knownRaceEthTest > 0) {
      metrics.push('tests')
    }
    if (coreData.knownRaceEthPos > 0) {
      metrics.push('cases')
    }
    if (testHospData.knownRaceEthHosp > 0) {
      metrics.push('hospitalizations')
    }
    if (coreData.knownRaceEthDeath > 0) {
      metrics.push('deaths')
    }
  } else {
    if (testHospData.knownRaceTest > 0 || testHospData.knownEthTest > 0) {
      metrics.push('tests')
    }
    if (coreData.knownRacePos > 0 || coreData.knownEthPos > 0) {
      metrics.push('cases')
    }
    if (testHospData.knownRaceHosp > 0 || testHospData.knownEthHosp > 0) {
      metrics.push('hospitalizations')
    }
    if (coreData.knownRaceDeath > 0 || coreData.knownEthDeath > 0) {
      metrics.push('deaths')
    }
  }

  return metrics
}

const RaceEthnicityStateTemplate = ({ pageContext, path, data }) => {
  const state = pageContext
  const { slug } = state.childSlug

  const isCombined = data.covidRaceDataCombined !== null
  const coreData = isCombined
    ? data.covidRaceDataCombined
    : data.covidRaceDataSeparate
  const testHospData = isCombined
    ? data.covidRaceHospTestDataCombined
    : data.covidRaceHospTestDataSeparate
  const lastUpdated = data.allCovidRaceDataTimeseries.nodes[0].Date

  const availableMetrics = getAvailableMetrics(
    isCombined,
    coreData,
    testHospData,
  )

  const [currentMetric, setCurrentMetric] = useState('Cases')
  const [dataTablesSectionIsOpen, setDataTablesSectionIsOpen] = useState(false)

  const populationData = data.covidAcsPopulation
  const timeSeriesData = data.allCovidRaceDataTimeseries.nodes

  // includes per cap values
  const completeTimeSeriesData =
    populationData === null
      ? timeSeriesData
      : addPer100kValues(timeSeriesData, populationData)

  return (
    <Layout
      title={`${state.name}: All Race & Ethnicity Historical Data`}
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
        isCombined={isCombined}
        coreData={coreData}
        testHospData={testHospData}
        assessment={data.covidGradeStateAssessment.crdt}
        lastUpdatedByCtp={lastUpdated}
        allStates={data.allCovidStateInfo.nodes}
      />
      <Container centered className={styles.wrapper}>
        <CollapsibleSection title="Notes About the Data" open={false}>
          <Notes
            combinedData={data.covidRaceDataCombined}
            separateData={data.covidRaceDataSeparate}
            combinedTestHosp={data.covidRaceHospTestDataCombined}
            separateTestHosp={data.covidRaceHospTestDataSeparate}
            forBreakout
          />
        </CollapsibleSection>
        <CumulativeNotes
          availableMetrics={availableMetrics}
          state={coreData}
          testHospData={testHospData}
          lastUpdated={lastUpdated}
        />
      </Container>
      <div className={styles.barCharts}>
        <StateRaceBarCharts
          availableMetrics={availableMetrics}
          state={coreData}
          testHospData={testHospData}
          combinedStates={isCombined ? [state.state] : []}
        />
      </div>
      <Container className={!dataTablesSectionIsOpen && styles.tablesWrapper}>
        <CollapsibleSection
          title="Data Tables"
          open={false}
          isOpen={dataTablesSectionIsOpen}
          setIsOpen={setDataTablesSectionIsOpen}
        >
          <div className={styles.tablesContainer}>
            {!isCombined ? (
              // separate
              <>
                <SeparateTableAndNotes
                  stateData={{ ...coreData, ...testHospData }}
                  type="Race"
                  inEthnicityState
                />
                <SeparateTableAndNotes
                  stateData={{ ...coreData, ...testHospData }}
                  type="Ethnicity"
                />
              </>
            ) : (
              <CombinedTableAndNotes
                stateData={{ ...coreData, ...testHospData }}
              />
            )}
          </div>
        </CollapsibleSection>
      </Container>
      <Container centered>
        <CollapsibleSection title="Historical Data">
          <SelectorAndCharts
            stateIsCombined={isCombined}
            lastReportedByState={coreData.stateUpdate.value}
            stateName={state.name}
            currentMetric={currentMetric}
            setCurrentMetric={setCurrentMetric}
            asOfDate={timeSeriesData[0].Date}
            completeTimeSeriesData={completeTimeSeriesData}
            className={styles.selectorAndCharts}
            isEmbed
          />
          <CtaLink bold centered to={`${path}/historical`}>
            View All Historical Data
          </CtaLink>
        </CollapsibleSection>
        <CollapsibleSection title="Further Resources">
          <FurtherResources
            vaccineSources={data.crdtVaccineSources.sources}
            stateName={state.name}
            stateSlug={slug}
          />
        </CollapsibleSection>
      </Container>
    </Layout>
  )
}

export default RaceEthnicityStateTemplate

export const query = graphql`
  query($state: String!) {
    crdtVaccineSources(state: { eq: $state }) {
      sources
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
    allCovidStateInfo {
      nodes {
        name
        state
        childSlug {
          slug
        }
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
    covidGradeStateAssessment {
      crdt
    }
    covidRaceDataCombined(state: { eq: $state }) {
      aianDeathCaution
      aianDeathDispFlag
      aianDeathPerCap
      aianDeaths
      aianPctDeath
      aianPctPop
      aianPctPos
      aianPosCaution
      aianPosDispFlag
      aianPositives
      aianPosPerCap
      aianSmallN
      anyDeathData
      anyPosData
      apiDeathPerCap
      apiNote
      apiPosPerCap
      apiSmallN
      asianDeathCaution
      asianDeathDispFlag
      asianDeathPerCap
      asianDeaths
      asianPctDeath
      asianPctPop
      asianPctPos
      asianPosCaution
      asianPosDispFlag
      asianPositives
      asianPosPerCap
      asianSmallN
      blackDeathCaution
      blackDeathDispFlag
      blackDeathPerCap
      blackDeaths
      blackPctDeath
      blackPctPop
      blackPctPos
      blackPosCaution
      blackPosDispFlag
      blackPositives
      blackPosPerCap
      blackSmallN
      historicalSmallNNote
      id
      knownRaceEthDeath
      knownRaceEthPos
      latinXDeathCaution
      latinXDeathDispFlag
      latinXDeathPerCap
      latinXDeaths
      latinxNote
      latinXPctDeath
      latinXPctPop
      latinXPctPos
      latinXPosCaution
      latinXPosDispFlag
      latinXPositives
      latinXPosPerCap
      latinXSmallN
      mutExclNote
      name
      nhpiDeathCaution
      nhpiDeathDispFlag
      nhpiDeathPerCap
      nhpiDeaths
      nhpiPctDeath
      nhpiPctPop
      nhpiPctPos
      nhpiPosCaution
      nhpiPosDispFlag
      nhpiPositives
      nhpiPosPerCap
      nhpiSmallN
      otherDeathCaution
      otherDeathDispFlag
      otherDeaths
      otherNote
      otherPctDeath
      otherPctPop
      otherPctPos
      otherPosCaution
      otherPosDispFlag
      otherPositives
      popTableNote
      smallNNote
      state
      twoDeathCaution
      twoDeathDispFlag
      twoDeaths
      twoPctDeath
      twoPctPop
      twoPctPos
      twoPosCaution
      twoPosDispFlag
      twoPositives
      unknownRaceEthDeath
      unknownRaceEthPos
      whiteDeathCaution
      whiteDeathDispFlag
      whiteDeathPerCap
      whiteDeaths
      whitePctDeath
      whitePctPop
      whitePctPos
      whitePosCaution
      whitePosDispFlag
      whitePositives
      whitePosPerCap
      whiteSmallN
      stateUpdate {
        value
      }
      lastCheckDate {
        value
      }
    }
    covidRaceDataSeparate(state: { eq: $state }) {
      aianDeathCaution
      aianDeathDispFlag
      aianDeathPerCap
      aianDeaths
      aianPctDeath
      aianPctPop
      aianPctPos
      aianPosCaution
      aianPosDispFlag
      aianPositives
      aianPosPerCap
      aianSmallN
      aianSpecialCaseNotes
      anyDeathData
      anyPosData
      apiDeathPerCap
      apiNote
      apiPosPerCap
      apiSmallN
      asianDeathCaution
      asianDeathDispFlag
      asianDeathPerCap
      asianDeaths
      asianPctDeath
      asianPctPop
      asianPctPos
      asianPosCaution
      asianPosDispFlag
      asianPositives
      asianPosPerCap
      asianSmallN
      asianSpecialCaseNotes
      blackDeathCaution
      blackDeathDispFlag
      blackDeathPerCap
      blackDeaths
      blackPctDeath
      blackPctPop
      blackPctPos
      blackPosCaution
      blackPosDispFlag
      blackPositives
      blackPosPerCap
      blackSmallN
      blackSpecialCaseNotes
      deathEthData
      deathRaceData
      historicalSmallNNote
      id
      knownEthDeath
      knownEthPos
      knownRaceDeath
      knownRacePos
      latinXDeathCaution
      latinXDeathDispFlag
      latinXDeathPerCap
      latinXDeaths
      latinxNote
      latinXPctDeath
      latinXPctPop
      latinXPctPos
      latinXPosCaution
      latinXPosDispFlag
      latinXPositives
      latinXPosPerCap
      latinXSmallN
      mutExclNote
      name
      nhpiDeathCaution
      nhpiDeathDispFlag
      nhpiDeathPerCap
      nhpiDeaths
      nhpiPctDeath
      nhpiPctPop
      nhpiPctPos
      nhpiPosCaution
      nhpiPosDispFlag
      nhpiPositives
      nhpiPosPerCap
      nhpiSmallN
      nhpiSpecialCaseNotes
      nonhispanicDeathCaution
      nonhispanicDeathDispFlag
      nonhispanicDeaths
      nonhispanicPctDeath
      nonhispanicPctPop
      nonhispanicPctPos
      nonhispanicPosCaution
      nonhispanicPosDispFlag
      nonhispanicPositives
      nonhispanicSpecialCaseNotes
      otherDeathCaution
      otherDeathDispFlag
      otherDeaths
      otherNote
      otherPctDeath
      otherPctPop
      otherPctPos
      otherPosCaution
      otherPosDispFlag
      otherPositives
      otherSpecialCaseNotes
      popTableNote
      posEthData
      posRaceData
      smallNNote
      state
      twoDeathCaution
      twoDeathDispFlag
      twoDeaths
      twoPctDeath
      twoPctPop
      twoPctPos
      twoPosCaution
      twoPosDispFlag
      twoPositives
      twoSpecialCaseNotes
      unknownEthDeath
      unknownEthPos
      unknownRaceDeath
      unknownRacePos
      whiteDeathCaution
      whiteDeathDispFlag
      whiteDeathPerCap
      whiteDeaths
      whitePctDeath
      whitePctPop
      whitePctPos
      whitePosCaution
      whitePosDispFlag
      whitePositives
      whitePosPerCap
      whiteSmallN
      whiteSpecialCaseNotes
      stateUpdate {
        value
      }
      lastCheckDate {
        value
      }
    }
    covidRaceHospTestDataCombined(state: { eq: $state }) {
      aianHospCaution
      aianHospDispFlag
      aianHospPercap
      aianPctHosp
      aianPctTest
      aianTestCaution
      aianTestDispFlag
      aianTestPercap
      anyHospData
      anyTestData
      apiHospPercap
      apiTestPercap
      asianHospPercap
      asianTestPercap
      blackHospCaution
      blackHospDispFlag
      blackHospPercap
      blackPctHosp
      blackPctTest
      blackTestCaution
      blackTestDispFlag
      blackTestPercap
      knownRaceEthHosp
      knownRaceEthTest
      latinXHospCaution
      latinXHospDispFlag
      latinXHospPercap
      latinXPctHosp
      latinXPctTest
      latinXTestCaution
      latinXTestDispFlag
      latinXTestPercap
      name
      nhpiHospCaution
      nhpiHospDispFlag
      nhpiHospPercap
      nhpiPctHosp
      nhpiPctTest
      nhpiTestCaution
      nhpiTestDispFlag
      nhpiTestPercap
      otherHospCaution
      otherHospDispFlag
      otherPctHosp
      otherPctTest
      otherTestCaution
      otherTestDispFlag
      twoHospCaution
      twoHospDispFlag
      twoPctHosp
      twoPctTest
      twoTestCaution
      twoTestDispFlag
      whiteHospCaution
      whiteHospDispFlag
      whiteHospPercap
      whitePctHosp
      whitePctTest
      whiteTestCaution
      whiteTestDispFlag
      whiteTestPercap
    }
    covidRaceHospTestDataSeparate(state: { eq: $state }) {
      aianHospCaution
      aianHospDispFlag
      aianHospPercap
      aianPctHosp
      aianPctTest
      aianTestCaution
      aianTestDispFlag
      aianTestPercap
      anyHospData
      anyTestData
      apiHospPercap
      apiTestPercap
      asianHospPercap
      asianTestPercap
      blackHospCaution
      blackHospDispFlag
      blackHospPercap
      blackPctHosp
      blackPctTest
      blackTestCaution
      blackTestDispFlag
      blackTestPercap
      knownEthHosp
      knownEthTest
      knownRaceHosp
      knownRaceTest
      latinXHospCaution
      latinXHospDispFlag
      latinXHospPercap
      latinXPctHosp
      latinXPctTest
      latinXTestCaution
      latinXTestDispFlag
      latinXTestPercap
      name
      nhpiHospCaution
      nhpiHospDispFlag
      nhpiHospPercap
      nhpiPctHosp
      nhpiPctTest
      nhpiTestCaution
      nhpiTestDispFlag
      nhpiTestPercap
      nonhispanicHospCaution
      nonhispanicHospDispFlag
      nonhispanicPctHosp
      nonhispanicPctTest
      nonhispanicTestCaution
      nonhispanicTestDispFlag
      otherHospCaution
      otherHospDispFlag
      otherPctHosp
      otherPctTest
      otherTestCaution
      otherTestDispFlag
      twoHospCaution
      twoHospDispFlag
      twoPctHosp
      twoPctTest
      twoTestCaution
      twoTestDispFlag
      whiteHospCaution
      whiteHospDispFlag
      whiteHospPercap
      whitePctHosp
      whitePctTest
      whiteTestCaution
      whiteTestDispFlag
      whiteTestPercap
    }
  }
`
