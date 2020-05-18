import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import TableTitle from './table-title'
import { RaceTable } from './breakdown-tables'
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
          />
        </div>
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race/ethnicity" />
        </div>
      </div>
      <TableTitle titleText="Cases and deaths by race/ethnicity" />
      <RaceTable
        data={stateData}
        type="Race/ethnicity"
        notes={notes}
        groupedNotes={groupedNotes}
      />
      <TableNotes state={stateData.state} groupedNotes={groupedNotes} />
    </div>
  )
}
