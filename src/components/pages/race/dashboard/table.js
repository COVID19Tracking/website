import React from 'react'
import { Link } from 'gatsby'
import { Table, Th, Td } from '~components/common/table'
import Percent from './percent'
import { NoteSymbol, DisparitySymbol } from './table-symbols'
import alertBang from '../../../../images/race-dashboard/alert-bang-orange.svg'
import stateTableStyle from './table.module.scss'

const StateTable = Table

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
      {children}
    </Th>
  )
}

const StateTableHeader = ({ groupTitle, noDeaths, noPositives }) => (
  <thead>
    <tr>
      <Th additionalClass={stateTableStyle.group}>{groupTitle}</Th>
      <Th additionalClass={stateTableStyle.percent} isFirst>
        Percentage of population
      </Th>
      <StateTableDataHeader noData={noPositives}>
        Percentage of cases
      </StateTableDataHeader>
      <StateTableDataHeader noData={noDeaths}>
        Percentage of deaths
      </StateTableDataHeader>
    </tr>
  </thead>
)

const StateTableDataCell = ({
  row,
  index,
  rowCount,
  state,
  type,
  noData, // if true, this data is not provided by this state
}) => {
  if (noData) {
    if (index === 0) {
      return (
        <Td rowspan={rowCount} additionalClass={stateTableStyle.missingData}>
          <span>
            {state} does not report {type} data for cases that are not deaths.{' '}
            <Link to="/get-involved">Help us get better data.</Link>
          </span>
        </Td>
      )
    }
    return <></>
  }
  return (
    <Td>
      <>
        <Percent number={row.positive.value} />
        {row.positive.note.index !== -1 && (
          <NoteSymbol
            index={row.positive.note.index + 1}
            title={row.positive.note.value}
            linkTo={`${state}-table-note-${row.positive.note.index + 1}`}
          />
        )}
        {row.positive.disparity && <DisparitySymbol />}
      </>
    </Td>
  )
}

const StateTableBody = ({
  state,
  rows,
  type,
  noPositives = false,
  noDeaths = false,
}) => (
  <tbody>
    {rows.map((row, index) => (
      <tr>
        <GroupRowHeader>{row.group}</GroupRowHeader>
        <Td isFirst>
          <Percent number={row.population} />
        </Td>
        <StateTableDataCell
          row={row}
          index={index}
          rowCount={rows.length}
          type={type}
          state={state}
          noData={noPositives}
        />
        <StateTableDataCell
          row={row}
          index={index}
          rowCount={rows.length}
          type={type}
          state={state}
          noData={noDeaths}
        />
      </tr>
    ))}
  </tbody>
)

export { StateTable, GroupRowHeader, StateTableHeader, Td, StateTableBody }
