import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import TableTitle from './table-title'
import RaceTable from './race-table'
import stateStyle from './state.module.scss'

export default ({ state }) => {
  const stateData = state
  const notes = [] // todo fix this
  const groupedNotes = [...new Set(Object.values(notes))]
  return (
    <div>
      <div className={stateStyle.stateOverview}>
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
        notes={notes}
        groupedNotes={groupedNotes}
      />
      <TableNotes state={stateData.state} groupedNotes={groupedNotes} />
    </div>
  )
}
