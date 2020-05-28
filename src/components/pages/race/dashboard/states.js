import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import slugify from 'slugify'
import StateSeparate from './state-separate'
import StateCombined from './state-combined'
import statesStyle from './states.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidRaceDataCombined(
        filter: { state: { ne: "US" } }
        sort: { fields: stateName }
      ) {
        nodes {
          id
          name: stateName
          state
          aianANHPIDeathNotes
          aianANHPIPosNotes
          aianDeathCaution
          aianDeathDispFlag
          aianDeathNotes
          aianDeathNotes
          aianDeaths
          aianPctDeath
          aianPctPop
          aianPctPos
          aianPosCaution
          aianPosDispFlag
          aianPositives
          aianPosNotes
          aianPosNotes
          anyDeathData
          anyPosData
          asianANHPIDeathNotes
          asianANHPIPosNotes
          asianDeathCaution
          asianDeathDispFlag
          asianDeathNotes
          asianDeathNotes
          asianDeaths
          asianPctDeath
          asianPctPop
          asianPctPos
          asianPosCaution
          asianPosDispFlag
          asianPositives
          asianPosNotes
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
          knownRaceEthDeath
          knownRaceEthPos
          latinXANHPINotes
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
          nhpiANHPIDeathNotes
          nhpiANHPINotes
          nhpiANHPIPosNotes
          nhpiDeathCaution
          nhpiDeathDispFlag
          nhpiDeathNotes
          nhpiDeathNotes
          nhpiDeaths
          nhpiPctDeath
          nhpiPctPop
          nhpiPctPos
          nhpiPosCaution
          nhpiPosDispFlag
          nhpiPositives
          nhpiPosNotes
          nhpiPosNotes
          otherANHPIDeathNotes
          otherANHPIPosNotes
          otherDeathCaution
          otherDeathDispFlag
          otherDeathNotes
          otherDeathNotes
          otherDeaths
          otherPctDeath
          otherPctPop
          otherPctPos
          otherPosCaution
          otherPosDispFlag
          otherPositives
          otherPosNotes
          otherPosNotes
          state
          stateName
          twoANHPIDeathNotes
          twoANHPIPosNotes
          twoDeathCaution
          twoDeathDispFlag
          twoDeathNotes
          twoDeathNotes
          twoDeaths
          twoPctDeath
          twoPctPop
          twoPctPos
          twoPosCaution
          twoPosDispFlag
          twoPositives
          twoPosNotes
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
        sort: { fields: stateName }
      ) {
        nodes {
          id
          state
          name: stateName
          anyPosData
          anyDeathData
          posRaceData
          posEthData
          deathRaceData
          deathEthData
          whitePositives
          whitePosDispFlag
          whitePosCaution
          whitePctPos
          whitePctPop
          whitePctDeath
          whiteDeaths
          whiteDeathDispFlag
          whiteDeathCaution
          unknownRacePos
          unknownRaceDeath
          unknownEthPos
          unknownEthDeath
          twoPositives
          twoPosNotes
          twoPosDispFlag
          twoPosCaution
          twoPctPos
          twoPctPop
          twoPctDeath
          twoDeaths
          twoDeathNotes
          twoDeathDispFlag
          twoDeathCaution
          otherPositives
          otherPosNotes
          otherPosDispFlag
          otherPosCaution
          otherPctPos
          otherPctPop
          otherPctDeath
          otherDeaths
          otherDeathCaution
          otherDeathNotes
          otherDeathDispFlag
          otherDeathCaution
          nonhispanicPositives
          nonhispanicPosDispFlag
          nonhispanicPosCaution
          nonhispanicPctPos
          nonhispanicPctPop
          nonhispanicPctDeath
          nonhispanicDeaths
          nonhispanicDeathDispFlag
          nonhispanicDeathCaution
          nhpiPositives
          nhpiPosNotes
          nhpiPosDispFlag
          nhpiPosCaution
          nhpiPctPos
          nhpiPctPop
          nhpiPctDeath
          nhpiDeaths
          nhpiDeathNotes
          nhpiDeathDispFlag
          nhpiDeathCaution
          nhpiANHPIPosNotes
          nhpiANHPIDeathNotes
          latinXPositives
          latinXPosDispFlag
          latinXPosCaution
          latinXPctPos
          latinXPctPop
          latinXPctDeath
          latinXDeaths
          latinXDeathDispFlag
          latinXDeathCaution
          knownRacePos
          knownRaceDeath
          knownEthPos
          knownEthDeath
          blackPositives
          blackPosDispFlag
          blackPosCaution
          blackPctPos
          blackPctPop
          blackPctDeath
          blackDeaths
          blackDeathDispFlag
          blackDeathCaution
          asianSpecialCaseNotes
          blackSpecialCaseNotes
          asianPositives
          asianPosNotes
          asianPosDispFlag
          asianPosCaution
          asianPctPos
          asianPctPop
          asianPctDeath
          asianDeaths
          asianDeathNotes
          asianDeathDispFlag
          asianDeathCaution
          asianANHPIPosNotes
          asianANHPIDeathNotes
          aianPositives
          aianPosNotes
          aianPosDispFlag
          aianPosCaution
          aianPctPos
          aianPctPop
          aianPctDeath
          aianDeaths
          aianDeathNotes
          aianDeathDispFlag
          aianDeathCaution
          aianSpecialCaseNotes
          nhpiSpecialCaseNotes
          twoSpecialCaseNotes
          whiteSpecialCaseNotes
          otherSpecialCaseNotes
          blackANHPIPosNotes
          blackANHPIDeathNotes
          blackPosNotes
          blackDeathNotes
          blackSpecialCaseNotes
          asianANHPIPosNotes
          asianANHPIDeathNotes
          asianPosNotes
          asianDeathNotes
          asianSpecialCaseNotes
          aianANHPIPosNotes
          aianANHPIDeathNotes
          aianPosNotes
          aianDeathNotes
          aianSpecialCaseNotes
          nhpiANHPIPosNotes
          nhpiANHPIDeathNotes
          nhpiPosNotes
          nhpiDeathNotes
          nhpiSpecialCaseNotes
          twoANHPIPosNotes
          twoANHPIDeathNotes
          twoPosNotes
          twoDeathNotes
          twoSpecialCaseNotes
          whiteANHPIPosNotes
          whiteANHPIDeathNotes
          whitePosNotes
          whiteDeathNotes
          whiteSpecialCaseNotes
          otherANHPIPosNotes
          otherANHPIDeathNotes
          otherPosNotes
          otherDeathNotes
          otherSpecialCaseNotes
          latinXANHPIPosNotes
          latinXANHPIDeathNotes
          latinXPosNotes
          latinXDeathNotes
          nonhispanicANHPIPosNotes
          nonhispanicANHPIDeathNotes
          nonhispanicPosNotes
          nonhispanicDeathNotes
          nonhispanicSpecialCaseNotes
        }
      }
    }
  `)

  const states = []
  data.allCovidRaceDataSeparate.nodes.forEach(state => {
    states.push({
      ...state,
      stateSeparate: true,
    })
  })
  data.allCovidRaceDataCombined.nodes.forEach(state => {
    states.push({
      ...state,
      stateSeparate: false,
    })
  })

  return (
    <section>
      {states
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(state => (
          <div className={statesStyle.state}>
            <h2
              id={`state-${slugify(state.state).toLowerCase()}`}
              className={statesStyle.header}
            >
              {state.name}
            </h2>
            <div>
              {state.stateSeparate ? (
                <StateSeparate state={state} />
              ) : (
                <StateCombined state={state} />
              )}
            </div>
          </div>
        ))}
    </section>
  )
}
