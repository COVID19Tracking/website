import React from 'react'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import TableTitle from './table-title'
import { RaceTable, EthnicityTable } from './breakdown-tables'
import stateStyle from './state.module.scss'

export default ({ state }) => {
  const stateData = state
  const raceNotes = {
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

  const groupedRaceNotes = [...new Set(Object.values(raceNotes))].filter(
    value => value && value,
  )

  const ethnicityNotes = {
    nonhispanicPos: stateData.nonhispanicPosNotes,
    nonhispanicDeath: stateData.nonhispanicDeathNotes,
    latinXPos: stateData.latinXPosNotes,
    latinXDeath: stateData.latinXDeathNotes,
  }
  const groupedEthnicityNotes = [
    ...new Set(Object.values(ethnicityNotes)),
  ].filter(value => value && value)

  return (
    <div>
      <div className={stateStyle.stateOverview}>
        {/* this is the race data section */}
        <PercentageOverview
          stateName={state.name}
          dataType="race"
          casePercent={state.knownRacePos}
          deathPercent={state.knownRaceDeath}
          className={stateStyle.totals}
        />
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race" />
        </div>
      </div>
      <TableTitle
        titleText="Cases and deaths by race"
        state={stateData.state}
      />
      <RaceTable
        data={stateData}
        type="Race"
        notes={raceNotes}
        groupedNotes={groupedRaceNotes}
        noPositives={!stateData.anyPosData}
        noDeaths={!stateData.anyDeathData}
      />
      <TableNotes state={stateData.state} groupedNotes={groupedRaceNotes} />
      {stateData.posEthData && stateData.deathEthData && (
        <>
          <div className={stateStyle.stateOverview}>
            {/* this is the ethnicity data section */}
            <PercentageOverview
              stateName={state.name}
              dataType="ethnicity"
              casePercent={state.knownEthPos}
              deathPercent={state.knownEthDeath}
              className={stateStyle.totals}
            />
            <div className={stateStyle.note}>
              <HeaderSorter stateName={state.name} stateReports="ethnicity" />
            </div>
          </div>

          <TableTitle
            titleText="Cases and deaths by ethnicity"
            state={stateData.state}
          />
          <EthnicityTable
            data={stateData}
            type="Ethnicity"
            notes={ethnicityNotes}
            groupedNotes={groupedEthnicityNotes}
            noPositives={!stateData.anyPosData}
            noDeaths={!stateData.anyDeathData}
          />
          <TableNotes
            state={stateData.state}
            groupedNotes={groupedEthnicityNotes}
          />
        </>
      )}
    </div>
  )
}
