import React from 'react'
import classnames from 'classnames'
import HeaderSorter from './header-sorter'
import TableNotes from './table-notes'
import PercentageOverview from './percentage-overview'
import anhpiNotes from './anhpi-notes'
import cautionNotes from './caution-notes'
import NoData from './no-data'
import RaceTable from './race-table'
import EthnicityTable from './ethnicity-table'
import stateStyle from './state.module.scss'

export default ({ state }) => {
  const stateData = state
  let raceNotes = {
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
    blackSpecialCase: stateData.blackSpecialCaseNotes,
    asianSpecialCase: stateData.asianSpecialCaseNotes,
    aianSpecialCase: stateData.aianSpecialCaseNotes,
    nhpiSpecialCase: stateData.nhpiSpecialCaseNotes,
    twoSpecialCase: stateData.twoSpecialCaseNotes,
    whiteSpecialCase: stateData.whiteSpecialCaseNotes,
    otherSpecialCase: stateData.otherSpecialCaseNotes,
  }

  raceNotes = anhpiNotes(stateData, raceNotes)
  raceNotes = cautionNotes(stateData, raceNotes)

  const groupedRaceNotes = [...new Set(Object.values(raceNotes))]
    .filter(value => value && value)
    .reverse()

  let ethnicityNotes = {
    nonhispanicPos: stateData.nonhispanicPosNotes,
    nonhispanicDeath: stateData.nonhispanicDeathNotes,
    latinXPos: stateData.latinXPosNotes,
    latinXDeath: stateData.latinXDeathNotes,
    latinXSpecialCase: stateData.latinXSpecialCaseNotes,
    nonhispanicSpecialCase: stateData.nonhispanicSpecialCaseNotes,
  }

  ethnicityNotes = cautionNotes(stateData, ethnicityNotes)

  const groupedEthnicityNotes = [...new Set(Object.values(ethnicityNotes))]
    .filter(value => value && value)
    .reverse()

  if (!stateData.anyPosData && !stateData.anyDeathData) {
    return <NoData stateName={stateData.name} />
  }

  const disparityExists =
    Object.keys(stateData).filter(
      field => field.search('DispFlag') > -1 && stateData[field],
    ).length > 0

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
          <HeaderSorter stateReports="race" />
        </div>
      </div>
      <h3 className={stateStyle.tableTitle}>Cases and deaths by race</h3>
      <RaceTable
        data={stateData}
        type="Race"
        notes={raceNotes}
        groupedNotes={groupedRaceNotes}
        noPositives={!stateData.posRaceData}
        noDeaths={!stateData.deathRaceData}
        isInEthnicityState
      />
      <TableNotes
        state={stateData.state}
        stateName={stateData.name}
        type="race"
        groupedNotes={groupedRaceNotes}
        disparityExists={disparityExists}
      />
      <>
        <div
          className={classnames(
            stateStyle.stateOverview,
            stateStyle.ethnicityOverview,
          )}
        >
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
        {(stateData.posEthData || stateData.deathEthData) && (
          <>
            <h3 className={stateStyle.tableTitle}>
              Cases and deaths by ethnicity
            </h3>
            <EthnicityTable
              data={stateData}
              type="Ethnicity"
              notes={ethnicityNotes}
              groupedNotes={groupedEthnicityNotes}
              noPositives={!stateData.posEthData}
              noDeaths={!stateData.deathEthData}
            />
            <TableNotes
              state={stateData.state}
              stateName={stateData.name}
              type="ethnicity"
              groupedNotes={groupedEthnicityNotes}
              disparityExists={disparityExists}
            />
          </>
        )}
      </>
    </div>
  )
}
