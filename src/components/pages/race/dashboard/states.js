import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import slugify from 'slugify'
import StateSeparate from '~components/pages/race/dashboard/state-separate'
import StateCombined from '~components/pages/race/dashboard/state-combined'
import statesStyle from '~components/pages/race/dashboard/states.module.scss'

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
          anyPosData
          anyDeathData
          whitePositives
          whitePosDispFlag
          whitePosCaution
          whitePctPos
          whitePctPop
          whitePctDeath
          whiteDeaths
          whiteDeathDispFlag
          whiteDeathCaution
          unknownRaceEthPos
          unknownRaceEthDeath
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
          stateName
          state
          otherPositives
          otherPosNotes
          otherPosDispFlag
          otherPosCaution
          otherPctPos
          otherPctPop
          otherPctDeath
          otherDeaths
          otherDeathNotes
          otherDeathDispFlag
          otherDeathCaution
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
          nhpiANHPINotes
          latinXPositives
          latinXPosDispFlag
          latinXPosCaution
          latinXPctPos
          latinXPctPop
          latinXPctDeath
          latinXDeaths
          latinXDeathDispFlag
          latinXDeathCaution
          knownRaceEthPos
          knownRaceEthDeath
          blackPositives
          blackPosDispFlag
          blackPosCaution
          blackPctPos
          blackPctPop
          blackPctDeath
          blackDeaths
          blackDeathDispFlag
          blackDeathCaution
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
          asianANHPINotes
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
          blackANHPINotes
          blackPosNotes
          blackDeathNotes
          asianANHPINotes
          asianPosNotes
          asianDeathNotes
          aianANHPINotes
          aianPosNotes
          aianDeathNotes
          nhpiANHPINotes
          nhpiPosNotes
          nhpiDeathNotes
          twoANHPINotes
          twoPosNotes
          twoDeathNotes
          whiteANHPINotes
          whitePosNotes
          whiteDeathNotes
          otherANHPINotes
          otherPosNotes
          otherDeathNotes
          latinXANHPINotes
          latinXPosNotes
          latinXDeathNotes
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
