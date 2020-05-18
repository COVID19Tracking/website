import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import TableTitle from './table-title'
import { StateTable, StateTableHeader, StateTableBody } from './table'
import stateStyle from './state.module.scss'

export default ({ state }) => {
  const stateData = state
  const notes = {
    otherDeath: stateData.otherDeathNotes,
    otherPos: stateData.otherPosNotes,
    whiteDeath: stateData.whiteDeathNotes,
    whitePos: stateData.whitePosNotes,
    twoDeath: stateData.twoDeathNotes,
    twoPos: stateData.twoPosNotes,
    aianDeath: stateData.aianDeathNotes,
    aianPos: stateData.aianPosNotes,
    nhpiDeath: stateData.nhpiDeathNotes,
    nhpiPos: stateData.nhpiPosNotes,
    asianDeath: stateData.asianDeathNotes,
    asianPos: stateData.asianPosNotes,
    latinXDeath: stateData.latinXDeathNotes,
    latinXPos: stateData.latinXPosNotes,
    blackDeath: stateData.blackDeathNotes,
    blackPos: stateData.blackPosNotes,
  }
  Object.keys(notes).forEach(key =>
    notes[key] === undefined || notes[key] === '' ? delete notes[key] : {},
  )
  if (stateData.asianPosCaution) {
    // if a state's Asian positives include NH/PI
    notes.asianPos = stateData.asianANHPINotes
    notes.nhpiPos = stateData.asianANHPINotes
    stateData.nhpiPctPos = null // handled in Percent
  }
  if (stateData.asianDeathCaution) {
    // if a state's Asian deaths include NH/PI
    notes.asianDeath = stateData.asianANHPINotes
    notes.nhpiDeath = stateData.asianANHPINotes
    stateData.nhpiPctDeath = null // handled in Percent
  }
  const groupedNotes = [...new Set(Object.values(notes))]
  return (
    <div>
      <div className={stateStyle.stateOverview}>
        <div className={stateStyle.totals}>
          <PercentageOverview
            stateName={state.name}
            dataType="racial and ethnicity"
            casePercent={state.knownRaceEthPos}
            deathPercent={state.knownRaceEthDeath}
            unknownRaceEthPos
            unknownRaceEthDeath
          />
        </div>
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race/ethnicity" />
        </div>
      </div>
      <TableTitle titleText="Cases and deaths by race/ethnicity" />
      <StateTable>
        <StateTableHeader groupTitle="Race/Ethnicity" />
        <StateTableBody
          state={stateData.name}
          type="race/ethnicity"
          rows={[
            {
              group: 'Black or African American alone',
              population: stateData.blackPctPop,
              positive: {
                disparity: stateData.blackPosDispFlag,
                value: stateData.blackPctPos,
                note: {
                  value: notes.blackPos,
                  index: groupedNotes.indexOf(notes.blackPos),
                },
              },
              death: {
                disparity: stateData.blackDeathDispFlag,
                value: stateData.blackPctDeath,
                note: {
                  value: notes.blackDeath,
                  index: groupedNotes.indexOf(notes.blackDeath),
                },
              },
            },
            {
              group: 'Hispanic or Latino *',
              population: stateData.latinXPctPop,
              positive: {
                disparity: stateData.latinXPosDispFlag,
                value: stateData.latinXPctPos,
                note: {
                  value: notes.latinXPos,
                  index: groupedNotes.indexOf(notes.latinXPos),
                },
              },
              death: {
                disparity: stateData.latinXDeathDispFlag,
                value: stateData.latinXPctDeath,
                note: {
                  value: notes.latinXDeath,
                  index: groupedNotes.indexOf(notes.latinXDeath),
                },
              },
            },
            {
              group: 'Asian alone',
              population: stateData.asianPctPop,
              positive: {
                disparity: stateData.asianPosDispFlag,
                value: stateData.asianPctPos,
                note: {
                  value: notes.asianPos,
                  index: groupedNotes.indexOf(notes.asianPos),
                },
              },
              death: {
                disparity: stateData.asianDeathDispFlag,
                value: stateData.asianPctDeath,
                note: {
                  value: notes.asianDeath,
                  index: groupedNotes.indexOf(notes.asianDeath),
                },
              },
            },
            {
              group: 'Native Hawaiian and Pacific Islander alone',
              population: stateData.nhpiPctPop,
              positive: {
                disparity: stateData.nhpiPosDispFlag,
                value: stateData.nhpiPctPos,
                note: {
                  value: notes.nhpiPos,
                  index: groupedNotes.indexOf(notes.nhpiPos),
                },
              },
              death: {
                disparity: stateData.nhpiDeathDispFlag,
                value: stateData.nhpiPctDeath,
                note: {
                  value: notes.nhpiDeath,
                  index: groupedNotes.indexOf(notes.nhpiDeath),
                },
              },
            },
            {
              group: 'American Indian or Alaska Native alone',
              population: stateData.aianPctPop,
              positive: {
                disparity: stateData.aianPosDispFlag,
                value: stateData.aianPctPos,
                note: {
                  value: notes.aianPos,
                  index: groupedNotes.indexOf(notes.aianPos),
                },
              },
              death: {
                disparity: stateData.aianDeathDispFlag,
                value: stateData.aianPctDeath,
                note: {
                  value: notes.aianDeath,
                  index: groupedNotes.indexOf(notes.aianDeath),
                },
              },
            },
            {
              group: 'Two or more races',
              population: stateData.twoPctPop,
              positive: {
                disparity: stateData.twoPosDispFlag,
                value: stateData.twoPctPos,
                note: {
                  value: notes.twoPos,
                  index: groupedNotes.indexOf(notes.twoPos),
                },
              },
              death: {
                disparity: stateData.twoDeathDispFlag,
                value: stateData.twoPctDeath,
                note: {
                  value: notes.twoDeath,
                  index: groupedNotes.indexOf(notes.twoDeath),
                },
              },
            },
            {
              group: 'White alone',
              population: stateData.whitePctPop,
              positive: {
                disparity: stateData.whitePosDispFlag,
                value: stateData.whitePctPos,
                note: {
                  value: notes.whitePos,
                  index: groupedNotes.indexOf(notes.whitePos),
                },
              },
              death: {
                disparity: stateData.whiteDeathDispFlag,
                value: stateData.whitePctDeath,
                note: {
                  value: notes.whiteDeath,
                  index: groupedNotes.indexOf(notes.whiteDeath),
                },
              },
            },
            {
              group: 'Some other race alone',
              population: stateData.otherPctPop,
              positive: {
                disparity: stateData.otherPosDispFlag,
                value: stateData.otherPctPos,
                note: {
                  value: notes.otherPos,
                  index: groupedNotes.indexOf(notes.otherPos),
                },
              },
              death: {
                disparity: stateData.otherDeathDispFlag,
                value: stateData.otherPctDeath,
                note: {
                  value: notes.otherDeath,
                  index: groupedNotes.indexOf(notes.otherDeath),
                },
              },
            },
          ]}
        />
      </StateTable>
      <TableNotes state={stateData.state} groupedNotes={groupedNotes} />
    </div>
  )
}
