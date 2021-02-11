import React from 'react'
import { Link } from 'gatsby'
import Tooltip from '~components/common/tooltip'
import { Table, Th, Td } from '~components/common/table'
import Percent from './percent'
import { Notes, DisparitySymbol, TooltipContent } from './table-symbols'
import tooltipDisparityIcon from '~images/race-dashboard/tooltip-disparity-icon.svg'
import alertBang from '~images/race-dashboard/alert-bang-orange.svg'
import stateTableStyle from './table.module.scss'

const StateTable = ({ children }) => (
  <Table className={stateTableStyle.table}>{children}</Table>
)

const GroupRowHeader = ({ children }) => (
  <Th additionalClass={stateTableStyle.group} scope="row">
    {children}
  </Th>
)

const StateTableDataHeader = ({ noData, children }) => {
  const classes = [stateTableStyle.percent]
  if (noData) {
    classes.push(stateTableStyle.missingData)
  }
  return (
    <Th additionalClass={classes}>
      {noData && <img src={alertBang} alt="Alert icon" />}
      <span className={stateTableStyle.headerText}>
        {children}
        {!noData && <div className={stateTableStyle.symbolSpacer} />}
      </span>
    </Th>
  )
}

const StateTableHeader = ({
  groupTitle,
  noDeaths,
  noPositives,
  noTests,
  noHospitalizations,
}) => (
  <thead>
    <tr>
      <Th additionalClass={stateTableStyle.group}>{groupTitle}</Th>
      <Th additionalClass={stateTableStyle.percent} isFirst>
        Percentage of
        <br />
        population
      </Th>
      <StateTableDataHeader noData={noPositives}>
        Percentage of
        <br />
        cases
      </StateTableDataHeader>
      <StateTableDataHeader noData={noDeaths}>
        Percentage of
        <br />
        deaths
      </StateTableDataHeader>
      <StateTableDataHeader noData={noTests}>
        Percentage of
        <br />
        tests
      </StateTableDataHeader>
      <StateTableDataHeader noData={noHospitalizations}>
        Percentage of
        <br />
        hospitalizations
      </StateTableDataHeader>
    </tr>
  </thead>
)

const StateCellPercent = ({ number, disparity, note, noteIndex }) => {
  const value = <Percent number={number} highlight={disparity || note} />
  if (disparity) {
    return (
      <Tooltip
        label={
          <>
            <img src={tooltipDisparityIcon} alt="" /> Racial/ethnic disparity
            likely.
          </>
        }
      >
        <span>{value}</span>
      </Tooltip>
    )
  }
  if (note) {
    return (
      <Tooltip label={<TooltipContent title={note} index={noteIndex} />}>
        <span>{value}</span>
      </Tooltip>
    )
  }
  return value
}

const StateTableDataCell = ({
  index,
  rowCount,
  state,
  stateAbbr,
  type,
  errorType,
  noData, // if true, this data is not provided by this state
  cellData,
}) => {
  if (noData) {
    if (index === 0) {
      return (
        <Td rowspan={rowCount} additionalClass={stateTableStyle.missingData}>
          <span>
            {state} does not report {type.toLowerCase()} data for {errorType}.{' '}
            <Link to="/race/get-better-data">Help us get better data.</Link>
          </span>
        </Td>
      )
    }
    return <></>
  }
  return (
    <Td>
      <>
        <StateCellPercent
          // todo remove || for number
          number={cellData.value || undefined}
          disparity={cellData.disparity}
          note={cellData.note.value}
          noteIndex={cellData.note.index + 1}
        />

        <div className={stateTableStyle.symbolSpacer}>
          <Notes
            index={cellData.note.index + 1}
            title={cellData.note.value}
            linkTo={`notes-${stateAbbr.toLowerCase()}`}
          />
          {cellData.disparity && (
            <DisparitySymbol linkTo={`notes-${stateAbbr.toLowerCase()}`} />
          )}
        </div>
      </>
    </Td>
  )
}

const StateTableBody = ({
  state,
  stateAbbr,
  rows,
  type,
  noPositives = false,
  noDeaths = false,
  noTests = false,
  noHospitalizations = false,
}) => (
  <tbody>
    {rows.map((row, index) => (
      <tr>
        <GroupRowHeader>{row.group}</GroupRowHeader>
        <Td isFirst>
          <Percent number={row.population} />
        </Td>
        <StateTableDataCell
          index={index}
          rowCount={rows.length}
          type={type}
          errorType="cases"
          state={state}
          stateAbbr={stateAbbr}
          noData={noPositives}
          cellData={row.positive}
        />
        <StateTableDataCell
          index={index}
          rowCount={rows.length}
          type={type}
          errorType="deaths"
          state={state}
          stateAbbr={stateAbbr}
          noData={noDeaths}
          cellData={row.death}
        />
        {row.test && (
          <StateTableDataCell
            // todo remove conditional here
            index={index}
            rowCount={rows.length}
            type={type}
            errorType="tests"
            state={state}
            stateAbbr={stateAbbr}
            noData={noTests}
            cellData={row.test}
          />
        )}
        {row.hospitalization && (
          // todo remove conditional here
          <StateTableDataCell
            index={index}
            rowCount={rows.length}
            type={type}
            errorType="hospitalizations"
            state={state}
            stateAbbr={stateAbbr}
            noData={noHospitalizations}
            cellData={row.hospitalization}
          />
        )}
      </tr>
    ))}
  </tbody>
)

export { StateTable, GroupRowHeader, StateTableHeader, Td, StateTableBody }
