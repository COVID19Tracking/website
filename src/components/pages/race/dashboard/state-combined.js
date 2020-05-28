import React from 'react'
import HeaderSorter from '~components/pages/race/dashboard/header-sorter'
import TableNotes from '~components/pages/race/dashboard/table-notes'
import PercentageOverview from '~components/pages/race/dashboard/percentage-overview'
import TableTitle from '~components/pages/race/dashboard/table-title'
import { RaceTable } from '~components/pages/race/dashboard/breakdown-tables'
import stateStyle from '~components/pages/race/dashboard/state.module.scss'

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
  if (stateData.asianPosCaution) {
    // if a state's Asian positives include NH/PI
    notes.asianPos = stateData.asianANHPIPosNotes
    notes.nhpiPos = stateData.nhpiANHPIPosNotes
    stateData.nhpiPctPos = null // handled in Percent
  }
  if (stateData.asianDeathCaution) {
    // if a state's Asian deaths include NH/PI
    notes.asianDeath = stateData.asianANHPIDeathNotes
    notes.nhpiDeath = stateData.nhpiANHPIDeathNotes
    stateData.nhpiPctDeath = null // handled in Percent
  }

  const groupedNotes = [...new Set(Object.values(notes))]
    .reverse()
    .filter(value => value && value.trim().length && value)

  return (
    <div>
      <div className={stateStyle.stateOverview}>
        <PercentageOverview
          stateName={state.name}
          dataType="race and ethnicity"
          casePercent={state.knownRaceEthPos}
          deathPercent={state.knownRaceEthDeath}
          className={stateStyle.totals}
        />
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race/ethnicity" />
        </div>
      </div>
      <TableTitle
        titleText="Cases and deaths by race/ethnicity"
        state={stateData.state}
      />
      <RaceTable
        data={stateData}
        type="Race/ethnicity"
        notes={notes}
        groupedNotes={groupedNotes}
        noPositives={!stateData.anyPosData}
        noDeaths={!stateData.anyDeathData}
        isCombined
      />
      <p>
        * Hispanic or Latino ethnicity, any race. All other race categories in
        this table are defined as Not Hispanic or Latino.
      </p>
      <TableNotes
        state={stateData.state}
        stateName={stateData.name}
        groupedNotes={groupedNotes}
      />
    </div>
  )
}
