import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import TableTitle from './table-title'
import { RaceTable, EthnicityTable } from './breakdown-tables'
import stateStyle from './state.module.scss'

export default ({ state }) => {
  const stateData = state
  const raceNotes = [] // todo fix this
  const groupedRaceNotes = [...new Set(Object.values(raceNotes))]

  const ethnicityNotes = [] // todo fix this
  const groupedEthnicityNotes = [...new Set(Object.values(ethnicityNotes))]

  return (
    <div>
      <div className={stateStyle.stateOverview}>
        {/* this is the race data section */}
        <div className={stateStyle.totals}>
          <PercentageOverview
            stateName={state.name}
            dataType="race"
            casePercent={state.knownRacePos}
            deathPercent={state.knownRaceDeath}
          />
        </div>
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race" />
        </div>
      </div>
      <TableTitle titleText="Cases and deaths by race" />
      <RaceTable
        data={stateData}
        type="Race"
        notes={raceNotes}
        groupedNotes={groupedRaceNotes}
      />
      <TableNotes state={stateData.state} groupedNotes={groupedRaceNotes} />

      <div className={stateStyle.stateOverview}>
        {/* this is the ethnicity data section */}
        <div className={stateStyle.totals}>
          <PercentageOverview
            stateName={state.name}
            dataType="ethnicity"
            casePercent={state.knownEthPos}
            deathPercent={state.knownEthDeath}
          />
        </div>
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="ethnicity" />
        </div>
      </div>
      <TableTitle titleText="Cases and deaths by ethnicity" />
      <EthnicityTable
        data={stateData}
        type="Ethnicity"
        notes={ethnicityNotes}
        groupedNotes={groupedEthnicityNotes}
      />
      <TableNotes
        state={stateData.state}
        groupedNotes={groupedEthnicityNotes}
      />
    </div>
  )
}
