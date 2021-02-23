import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import smartypants from 'smartypants'

import DashboardSmallCards from './small-cards'
import StateSeparate from './state-separate'
import StateCombined from './state-combined'

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
}

const CrdtDashboardStates = () => {
  const data = useStaticQuery(graphql`
    query {
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
          aianDeaths
          aianPctDeath
          aianPctPop
          aianPctPos
          aianPosCaution
          aianPosDispFlag
          aianPositives
          aianPosNotes
          anyDeathData
          anyPosData
          asianANHPIDeathNotes
          asianANHPIPosNotes
          asianDeathCaution
          asianDeathDispFlag
          asianDeathNotes
          asianDeaths
          asianPctDeath
          asianPctPop
          asianPctPos
          asianPosCaution
          asianPosDispFlag
          asianPositives
          asianPosNotes
          blackANHPIDeathNotes
          blackANHPIPosNotes
          blackDeathCaution
          blackDeathDispFlag
          blackDeathNotes
          blackDeaths
          blackPctDeath
          blackPctPop
          blackPctPos
          blackPosCaution
          blackPosDispFlag
          blackPositives
          blackPosNotes
          id
          knownRaceEthDeath
          knownRaceEthPos
          latinXDeathCaution
          latinXDeathDispFlag
          latinXDeathNotes
          latinXDeaths
          latinXPctDeath
          latinXPctPop
          latinXPctPos
          latinXPosCaution
          latinXPosDispFlag
          latinXPositives
          latinXPosNotes
          name
          nhpiANHPIDeathNotes
          nhpiANHPIPosNotes
          nhpiDeathCaution
          nhpiDeathDispFlag
          nhpiDeathNotes
          nhpiDeaths
          nhpiPctDeath
          nhpiPctPop
          nhpiPctPos
          nhpiPosCaution
          nhpiPosDispFlag
          nhpiPositives
          nhpiPosNotes
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
          whiteDeaths
          whitePctDeath
          whitePctPop
          whitePctPos
          whitePosCaution
          whitePosDispFlag
          whitePositives
          whitePosNotes
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
          aianDeaths
          aianPctDeath
          aianPctPop
          aianPctPos
          aianPosCaution
          aianPosDispFlag
          aianPositives
          aianPosNotes
          aianSpecialCaseNotes
          anyDeathData
          anyPosData
          asianANHPIDeathNotes
          asianANHPIPosNotes
          asianDeathCaution
          asianDeathDispFlag
          asianDeathNotes
          asianDeaths
          asianPctDeath
          asianPctPop
          asianPctPos
          asianPosCaution
          asianPosDispFlag
          asianPositives
          asianPosNotes
          asianSpecialCaseNotes
          blackANHPIDeathNotes
          blackANHPIPosNotes
          blackDeathCaution
          blackDeathDispFlag
          blackDeathNotes
          blackDeaths
          blackPctDeath
          blackPctPop
          blackPctPos
          blackPosCaution
          blackPosDispFlag
          blackPositives
          blackPosNotes
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
          latinXDeaths
          latinXPctDeath
          latinXPctPop
          latinXPctPos
          latinXPosCaution
          latinXPosDispFlag
          latinXPositives
          latinXPosNotes
          name
          nhpiANHPIDeathNotes
          nhpiANHPIPosNotes
          nhpiDeathCaution
          nhpiDeathDispFlag
          nhpiDeathNotes
          nhpiDeaths
          nhpiPctDeath
          nhpiPctPop
          nhpiPctPos
          nhpiPosCaution
          nhpiPosDispFlag
          nhpiPositives
          nhpiPosNotes
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
          whiteDeaths
          whitePctDeath
          whitePctPop
          whitePctPos
          whitePosCaution
          whitePosDispFlag
          whitePositives
          whitePosNotes
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

  /*
  These are hardcoded territories that should not have social cards generated.
  They will not have the CTA for viewing the race data graphically, and will
  also not appear on the dropdown for the CRDT share images page.
  */
  const territoriesWithoutGraphics = ['AS', 'MP', 'VI']

  return (
    <section>
      {states
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(state => (
          <div className={statesStyle.state}>
            <h2
              id={`state-${state.state.toLowerCase()}`}
              className={statesStyle.header}
            >
              {state.name}
            </h2>
            {!territoriesWithoutGraphics.includes(state.state) && (
              <>
                <DashboardSmallCards
                  stateAbbreviation={state.state}
                  stateSlug={getStateSlug(state.state)}
                  // todo set the slug
                />
              </>
            )}
            <div>
              {state.stateSeparate ? (
                <StateSeparate state={state} />
              ) : (
                <StateCombined state={state} />
              )}
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
