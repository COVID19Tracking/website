import React from 'react'
import { graphql } from 'gatsby'

import CollapsibleSection from '~components/common/collapsible-section'
import Layout from '~components/layout'
import Container from '~components/common/container'
import { StateRaceBarCharts } from '~components/social-media-graphics/race/social-card'

import Hero from '~components/pages/race/breakouts/hero'
import CumulativeNotes from '~components/pages/race/breakouts/cumulative-notes'
import { Notes } from '~components/pages/state/race-ethnicity/notes-and-downloads'

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
        isCombined={isCombined}
        coreData={coreData}
        testHospData={testHospData}
        assessment={data.covidGradeStateAssessment.crdt}
        lastUpdatedByCtp={lastUpdated}
      />
      <Container centered>
        <CollapsibleSection title="Notes About the Data" open={false}>
          <Notes
            combinedData={data.covidRaceDataCombined}
            separateData={data.covidRaceDataSeparate}
            combinedTestHosp={data.covidRaceHospTestDataCombined}
            separateTestHosp={data.covidRaceHospTestDataSeparate}
          />
        </CollapsibleSection>
        <CumulativeNotes
          availableMetrics={availableMetrics}
          state={coreData}
          testHospData={testHospData}
          lastUpdated={lastUpdated}
        />
      </Container>
      <StateRaceBarCharts
        availableMetrics={availableMetrics}
        state={coreData}
        testHospData={testHospData}
        combinedStates={isCombined ? [state.state] : []}
      />
      <Container centered>
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
      knownRaceEthDeath
      knownRaceEthPos
      aianANHPIDeathNotes
      aianANHPIPosNotes
      aianDeathCaution
      aianDeathDispFlag
      aianDeathNotes
      aianDeathPerCap
      aianDeaths
      aianPctDeath
      aianPctPop
      aianPctPos
      aianPosCaution
      aianPosDispFlag
      aianPositives
      aianPosNotes
      aianPosPerCap
      aianSmallN
      anyDeathData
      anyPosData
      apiDeathPerCap
      apiPosPerCap
      apiSmallN
      asianANHPIDeathNotes
      asianANHPIPosNotes
      asianDeathCaution
      asianDeathDispFlag
      asianDeathNotes
      asianDeathPerCap
      asianDeaths
      asianPctDeath
      asianPctPop
      asianPctPos
      asianPosCaution
      asianPosDispFlag
      asianPositives
      asianPosNotes
      asianPosPerCap
      asianSmallN
      blackANHPIDeathNotes
      blackANHPIPosNotes
      blackDeathCaution
      blackDeathDispFlag
      blackDeathNotes
      blackDeathPerCap
      blackDeaths
      blackPctDeath
      blackPctPop
      blackPctPos
      blackPosCaution
      blackPosDispFlag
      blackPositives
      blackPosNotes
      blackPosPerCap
      blackSmallN
      id
      knownRaceEthDeath
      knownRaceEthPos
      latinXDeathCaution
      latinXDeathDispFlag
      latinXDeathNotes
      latinXDeathPerCap
      latinXDeaths
      latinXPctDeath
      latinXPctPop
      latinXPctPos
      latinXPosCaution
      latinXPosDispFlag
      latinXPositives
      latinXPosNotes
      latinXPosPerCap
      latinXSmallN
      name
      nhpiANHPIDeathNotes
      nhpiANHPIPosNotes
      nhpiDeathCaution
      nhpiDeathDispFlag
      nhpiDeathNotes
      nhpiDeathPerCap
      nhpiDeaths
      nhpiPctDeath
      nhpiPctPop
      nhpiPctPos
      nhpiPosCaution
      nhpiPosDispFlag
      nhpiPositives
      nhpiPosNotes
      nhpiPosPerCap
      nhpiSmallN
      state
      unknownRaceEthDeath
      unknownRaceEthPos
      whiteANHPIDeathNotes
      whiteANHPIPosNotes
      whiteDeathCaution
      whiteDeathDispFlag
      whiteDeathNotes
      whiteDeathPerCap
      whiteDeaths
      whitePctDeath
      whitePctPop
      whitePctPos
      whitePosCaution
      whitePosDispFlag
      whitePositives
      whitePosNotes
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
      name
      latinxNote
      mutExclNote
      smallNNote
      blackSmallN
      asianSmallN
      aianSmallN
      nhpiSmallN
      whiteSmallN
      latinXSmallN
      apiNote
      knownRaceDeath
      knownEthPos
      knownEthDeath
      knownRacePos
      aianANHPIDeathNotes
      aianANHPIPosNotes
      aianDeathCaution
      aianDeathDispFlag
      aianDeathNotes
      aianDeathPerCap
      aianDeaths
      aianPctDeath
      aianPctPop
      aianPctPos
      aianPosCaution
      aianPosDispFlag
      aianPositives
      aianPosNotes
      aianPosPerCap
      aianSmallN
      aianSpecialCaseNotes
      anyDeathData
      anyPosData
      apiDeathPerCap
      apiPosPerCap
      apiSmallN
      asianANHPIDeathNotes
      asianANHPIPosNotes
      asianDeathCaution
      asianDeathDispFlag
      asianDeathNotes
      asianDeathPerCap
      asianDeaths
      asianPctDeath
      asianPctPop
      asianPctPos
      asianPosCaution
      asianPosDispFlag
      asianPositives
      asianPosNotes
      asianPosPerCap
      asianSmallN
      asianSpecialCaseNotes
      blackANHPIDeathNotes
      blackANHPIPosNotes
      blackDeathCaution
      blackDeathDispFlag
      blackDeathNotes
      blackDeathPerCap
      blackDeaths
      blackPctDeath
      blackPctPop
      blackPctPos
      blackPosCaution
      blackPosDispFlag
      blackPositives
      blackPosNotes
      blackPosPerCap
      blackSmallN
      blackSpecialCaseNotes
      deathEthData
      deathRaceData
      id
      knownEthDeath
      knownEthPos
      knownRaceDeath
      knownRacePos
      latinXANHPIDeathNotes
      latinXANHPIPosNotes
      latinXDeathCaution
      latinXDeathDispFlag
      latinXDeathNotes
      latinXDeathPerCap
      latinXDeaths
      latinXPctDeath
      latinXPctPop
      latinXPctPos
      latinXPosCaution
      latinXPosDispFlag
      latinXPositives
      latinXPosNotes
      latinXPosPerCap
      latinXSmallN
      name
      nhpiANHPIDeathNotes
      nhpiANHPIPosNotes
      nhpiDeathCaution
      nhpiDeathDispFlag
      nhpiDeathNotes
      nhpiDeathPerCap
      nhpiDeaths
      nhpiPctDeath
      nhpiPctPop
      nhpiPctPos
      nhpiPosCaution
      nhpiPosDispFlag
      nhpiPositives
      nhpiPosNotes
      nhpiPosPerCap
      nhpiSmallN
      nhpiSpecialCaseNotes
      nonhispanicANHPIDeathNotes
      nonhispanicANHPIPosNotes
      nonhispanicDeathCaution
      nonhispanicDeathDispFlag
      nonhispanicDeathNotes
      nonhispanicDeaths
      nonhispanicPctDeath
      nonhispanicPctPop
      nonhispanicPctPos
      nonhispanicPosCaution
      nonhispanicPosDispFlag
      nonhispanicPositives
      nonhispanicPosNotes
      nonhispanicSpecialCaseNotes
      posEthData
      posRaceData
      state
      unknownEthDeath
      unknownEthPos
      unknownRaceDeath
      unknownRacePos
      whiteANHPIDeathNotes
      whiteANHPIPosNotes
      whiteDeathCaution
      whiteDeathDispFlag
      whiteDeathNotes
      whiteDeathPerCap
      whiteDeaths
      whitePctDeath
      whitePctPop
      whitePctPos
      whitePosCaution
      whitePosDispFlag
      whitePositives
      whitePosNotes
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
      knownRaceEthHosp
      knownRaceEthTest
      name
      blackTestPercap
      blackHospPercap
      latinXTestPercap
      latinXHospPercap
      asianTestPercap
      asianHospPercap
      aianTestPercap
      aianHospPercap
      whiteTestPercap
      whiteHospPercap
      apiTestPercap
      apiHospPercap
      nhpiTestPercap
      nhpiHospPercap
    }
    covidRaceHospTestDataSeparate(state: { eq: $state }) {
      knownRaceHosp
      knownRaceTest
      knownEthHosp
      knownEthTest
      name
      blackTestPercap
      blackHospPercap
      latinXTestPercap
      latinXHospPercap
      asianTestPercap
      asianHospPercap
      aianTestPercap
      aianHospPercap
      whiteTestPercap
      whiteHospPercap
      apiTestPercap
      apiHospPercap
      nhpiTestPercap
      nhpiHospPercap
    }
  }
`
