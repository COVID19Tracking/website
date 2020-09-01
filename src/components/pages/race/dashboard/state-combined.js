import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import anhpiNotes from './anhpi-notes'
import cautionNotes from './caution-notes'
import RaceTable from './race-table'
import stateStyle from './state.module.scss'

const StateCombined = ({ state }) => {
  const stateData = state
  let notes = {
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
  notes = anhpiNotes(stateData, notes)
  notes = cautionNotes(stateData, notes)
  const groupedNotes = [...new Set(Object.values(notes))]
    .reverse()
    .filter(value => value && value.trim().length && value)

  const disparityExists =
    Object.keys(stateData).filter(
      field => field.search('DispFlag') > -1 && stateData[field],
    ).length > 0

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
      <h3 className={stateStyle.tableTitle}>
        Cases and deaths by race/ethnicity
      </h3>
      <RaceTable
        data={stateData}
        type="Race/ethnicity"
        notes={notes}
        groupedNotes={groupedNotes}
        noPositives={!stateData.anyPosData}
        noDeaths={!stateData.anyDeathData}
        isCombined
      />
      <TableNotes
        state={stateData.state}
        stateName={stateData.name}
        groupedNotes={groupedNotes}
        disparityExists={disparityExists}
        hispanicLatinxNote
      />
    </div>
  )
}

export default StateCombined
