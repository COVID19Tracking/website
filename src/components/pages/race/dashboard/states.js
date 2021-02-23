import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import smartypants from 'smartypants'

import DashboardSmallCards from './small-cards'
import StateSeparate from './state-separate'
import StateCombined from './state-combined'

import { StateRaceSocialCardInner } from '~components/social-media-graphics/race/social-card'

import statesStyle from './states.module.scss'

const generateStates = (
  separateStates,
  combinedStates,
  separateTestHosp,
  combinedTestHosp,
) => {
  const states = []

  separateStates.forEach(state => {
    let testHospData
    separateTestHosp.every(testHospState => {
      if (testHospState.name === state.name) {
        testHospData = testHospState
        return false
      }
      return true
    })
    states.push({
      ...state,
      ...testHospData,
      stateSeparate: true,
    })
  })

  combinedStates.forEach(state => {
    let testHospData
    combinedTestHosp.every(testHospState => {
      if (testHospState.name === state.name) {
        testHospData = testHospState
        return false
      }
      return true
    })
    states.push({
      ...state,
      ...testHospData,
      stateSeparate: false,
    })
  })

  return states
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .filter(state => state.state !== 'AS') // todo remove this
}

const CrdtDashboardStates = () => {
  const data = useStaticQuery(graphql`
    query {
      covidRaceDataHomepage {
        statesReportingCases
        statesReportingDeaths
      }
      allCovidStateInfo {
        nodes {
          state
          name
          childSlug {
            slug
          }
        }
      }
      covidRaceDataTimeseries(Date: { ne: null }) {
        Date
      }
      allCovidRaceDataCombined(
        filter: { state: { ne: "US" } }
        sort: { fields: name }
      ) {
        nodes {
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
          otherANHPIDeathNotes
          otherANHPIPosNotes
          otherDeathCaution
          otherDeathDispFlag
          otherDeathNotes
          otherDeaths
          otherPctDeath
          otherPctPop
          otherPctPos
          otherPosCaution
          otherPosDispFlag
          otherPositives
          otherPosNotes
          state
          twoANHPIDeathNotes
          twoANHPIPosNotes
          twoDeathCaution
          twoDeathDispFlag
          twoDeathNotes
          twoDeaths
          twoPctDeath
          twoPctPop
          twoPctPos
          twoPosCaution
          twoPosDispFlag
          twoPositives
          twoPosNotes
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
        }
      }
      allCovidRaceDataSeparate(
        filter: { state: { ne: "US" } }
        sort: { fields: name }
      ) {
        nodes {
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
          otherANHPIDeathNotes
          otherANHPIPosNotes
          otherDeathCaution
          otherDeathDispFlag
          otherDeathNotes
          otherDeaths
          otherPctDeath
          otherPctPop
          otherPctPos
          otherPosCaution
          otherPosDispFlag
          otherPositives
          otherPosNotes
          otherSpecialCaseNotes
          posEthData
          posRaceData
          state
          twoANHPIDeathNotes
          twoANHPIPosNotes
          twoDeathCaution
          twoDeathDispFlag
          twoDeathNotes
          twoDeaths
          twoPctDeath
          twoPctPop
          twoPctPos
          twoPosCaution
          twoPosDispFlag
          twoPositives
          twoPosNotes
          twoSpecialCaseNotes
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
        }
      }
      allCovidRaceHospTestDataCombined {
        nodes {
          name
          anyHospData
          anyTestData
          knownRaceEthTest
          knownRaceEthHosp
          blackTestCaution
          blackTestDispFlag
          blackPctTest
          blackHospCaution
          blackHospDispFlag
          blackPctHosp
          latinXTestCaution
          latinXTestDispFlag
          latinXPctTest
          latinXHospCaution
          latinXHospDispFlag
          latinXPctHosp
          aianTestCaution
          aianTestDispFlag
          aianPctTest
          aianHospCaution
          aianHospDispFlag
          aianPctHosp
          nhpiTestCaution
          nhpiTestDispFlag
          nhpiPctTest
          nhpiHospCaution
          nhpiHospDispFlag
          nhpiPctHosp
          otherTestCaution
          otherTestDispFlag
          otherPctTest
          otherHospCaution
          otherHospDispFlag
          otherPctHosp
          twoTestCaution
          twoTestDispFlag
          twoPctTest
          twoHospCaution
          twoHospDispFlag
          twoPctHosp
          whiteTestCaution
          whiteTestDispFlag
          whitePctTest
          whiteHospCaution
          whiteHospDispFlag
          whitePctHosp
        }
      }
      allCovidRaceHospTestDataSeparate {
        nodes {
          name
          anyHospData
          anyTestData
          knownEthHosp
          knownEthTest
          knownRaceHosp
          knownRaceTest
          blackTestCaution
          blackTestDispFlag
          blackPctTest
          blackHospCaution
          blackHospDispFlag
          blackPctHosp
          latinXTestCaution
          latinXTestDispFlag
          latinXPctTest
          latinXHospCaution
          latinXHospDispFlag
          latinXPctHosp
          aianTestCaution
          aianTestDispFlag
          aianPctTest
          aianHospCaution
          aianHospDispFlag
          aianPctHosp
          nhpiTestCaution
          nhpiTestDispFlag
          nhpiPctTest
          nhpiHospCaution
          nhpiHospDispFlag
          nhpiPctHosp
          otherTestCaution
          otherTestDispFlag
          otherPctTest
          otherHospCaution
          otherHospDispFlag
          otherPctHosp
          twoTestCaution
          twoTestDispFlag
          twoPctTest
          twoHospCaution
          twoHospDispFlag
          twoPctHosp
          whiteTestCaution
          whiteTestDispFlag
          whitePctTest
          whiteHospCaution
          whiteHospDispFlag
          whitePctHosp
          nonhispanicTestCaution
          nonhispanicTestDispFlag
          nonhispanicPctTest
          nonhispanicHospCaution
          nonhispanicHospDispFlag
          nonhispanicPctHosp
        }
      }
      allCovidStateInfo {
        nodes {
          childSlug {
            slug
          }
          state
        }
      }
      disparityNote: contentfulSnippet(
        slug: { eq: "race-dashboard-disparity" }
      ) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
      comparibleNote: contentfulSnippet(
        slug: { eq: "race-dashboard-not-comparable" }
      ) {
        contentful_id
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)

  const combinedStates = data.allCovidRaceDataCombined.nodes.map(
    node => node.state,
  )

  const lastUpdated = data.covidRaceDataTimeseries.Date

  const states = generateStates(
    data.allCovidRaceDataSeparate.nodes,
    data.allCovidRaceDataCombined.nodes,
    data.allCovidRaceHospTestDataSeparate.nodes,
    data.allCovidRaceHospTestDataCombined.nodes,
  )

  const getStateSlug = abbreviation => {
    let slug
    data.allCovidStateInfo.nodes.every(state => {
      if (state.state === abbreviation) {
        slug = state.childSlug.slug
        return false
      }
      return true
    })
    return slug
  }

  return (
    <section>
      {states.map(state => (
        <div className={statesStyle.state}>
          <h2
            id={`state-${state.state.toLowerCase()}`}
            className={statesStyle.header}
          >
            {state.name}
          </h2>
          <DashboardSmallCards
            stateAbbreviation={state.state}
            stateSlug={getStateSlug(state.state)}
          />
          <div>
            {state.stateSeparate ? (
              <StateSeparate state={state} />
            ) : (
              <StateCombined state={state} />
            )}
            <StateRaceSocialCardInner
              state={
                data.allCovidRaceDataSeparate.nodes.find(
                  node => node.state === state.state,
                ) ||
                data.allCovidRaceDataCombined.nodes.find(
                  node => node.state === state.state,
                )
              }
              statesReportingCases={
                data.covidRaceDataHomepage.statesReportingCases
              }
              statesReportingDeaths={
                data.covidRaceDataHomepage.statesReportingDeaths
              }
              combinedStates={combinedStates}
              lastUpdatedByCtp={lastUpdated}
            />
          </div>
        </div>
      ))}
      <div className="js-disabled">
        <div
          id="notes-disparity"
          dangerouslySetInnerHTML={{
            __html: smartypants(
              data.disparityNote.childContentfulSnippetContentTextNode
                .childMarkdownRemark.html,
            ),
          }}
        />
        <div
          id="notes-comparible"
          dangerouslySetInnerHTML={{
            __html: smartypants(
              data.comparibleNote.childContentfulSnippetContentTextNode
                .childMarkdownRemark.html,
            ),
          }}
        />
      </div>
    </section>
  )
}

export default CrdtDashboardStates
