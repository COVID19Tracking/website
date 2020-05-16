import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
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
      <h3>Cases and deaths by race/ethnicity</h3>
      <StateTable>
        <StateTableHeader groupTitle="Race/Ethnicity" />
        <StateTableBody
          rows={[
            {
              group: 'Black or African American alone',
              population: stateData.blackPctPop,
              positive: {
                value: stateData.blackPctPos,
                note: {
                  value: notes.blackPos,
                  index: groupedNotes.indexOf(notes.blackPos),
                },
              },
              death: {
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
                value: stateData.latinXPctPos,
                note: {
                  value: notes.latinXPos,
                  index: groupedNotes.indexOf(notes.latinXPos),
                },
              },
              death: {
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
                value: stateData.asianPctPos,
                note: {
                  value: notes.asianPos,
                  index: groupedNotes.indexOf(notes.asianPos),
                },
              },
              death: {
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
                value: stateData.nhpiPctPos,
                note: {
                  value: notes.nhpiPos,
                  index: groupedNotes.indexOf(notes.nhpiPos),
                },
              },
              death: {
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
                value: stateData.aianPctPos,
                note: {
                  value: notes.aianPos,
                  index: groupedNotes.indexOf(notes.aianPos),
                },
              },
              death: {
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
                value: stateData.twoPctPos,
                note: {
                  value: notes.twoPos,
                  index: groupedNotes.indexOf(notes.twoPos),
                },
              },
              death: {
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
                value: stateData.whitePctPos,
                note: {
                  value: notes.whitePos,
                  index: groupedNotes.indexOf(notes.whitePos),
                },
              },
              death: {
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
                value: stateData.otherPctPos,
                note: {
                  value: notes.otherPos,
                  index: groupedNotes.indexOf(notes.otherPos),
                },
              },
              death: {
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
      <TableNotes groupedNotes={groupedNotes} />
    </div>
  )
}
