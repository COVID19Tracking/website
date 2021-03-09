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

const getRaceNotes = stateData => {
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
    .filter(value => value)
    .reverse()

  return {
    notes: raceNotes,
    groupedNotes: groupedRaceNotes,
  }
}

const getEthnicityNotes = stateData => {
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
    .filter(value => value)
    .reverse()

  return {
    notes: ethnicityNotes,
    groupedNotes: groupedEthnicityNotes,
  }
}

const TableAndNotes = ({ stateData, disparityExists, type }) => {
  let allNotes
  if (type === 'Race') {
    allNotes = getRaceNotes(stateData)
  } else {
    allNotes = getEthnicityNotes(stateData)
  }
  const tableProps = {
    data: stateData,
    type,
    notes: allNotes.notes,
    groupedNotes: allNotes.groupedNotes,
    noPositives: !stateData.posRaceData,
    noDeaths: !stateData.deathRaceData,
    isInEthnicityState: type === 'Ethnicity',
  }
  return (
    <div>
      {type === 'Race' ? (
        <RaceTable {...tableProps} />
      ) : (
        <EthnicityTable {...tableProps} />
      )}
      <TableNotes
        state={stateData.state}
        stateName={stateData.name}
        type={type.toLowerCase()}
        groupedNotes={allNotes.groupedNotes}
        disparityExists={disparityExists}
      />
    </div>
  )
}

const StateSeparate = ({ state }) => {
  const stateData = state

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
          hospitalizationPercent={state.knownRaceHosp}
          testPercent={state.knownRaceTest}
          casePercent={state.knownRacePos}
          deathPercent={state.knownRaceDeath}
          className={stateStyle.totals}
        />
        <div className={stateStyle.note}>
          <HeaderSorter stateName={state.name} stateReports="race" />
        </div>
      </div>
      <h3 className={stateStyle.tableTitle}>Cases and deaths by race</h3>
      <TableAndNotes
        stateData={stateData}
        disparityExists={disparityExists}
        type="Race"
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
            hospitalizationPercent={state.knownEthHosp}
            testPercent={state.knownEthTest}
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
            <TableAndNotes
              stateData={stateData}
              disparityExists={disparityExists}
              type="Ethnicity"
            />
          </>
        )}
      </>
    </div>
  )
}

export default StateSeparate
