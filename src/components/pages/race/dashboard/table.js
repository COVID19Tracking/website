import React from 'react'
import { Link } from 'gatsby'
import Tooltip from '@reach/tooltip'
import { Table, Th, Td } from '~components/common/table'
import Percent from './percent'
import { Notes, DisparitySymbol } from './table-symbols'
import tooltipDisparityIcon from '~images/tooltip-disparity-icon.svg'
import alertBang from '~images/race-dashboard/alert-bang-orange.svg'
import stateTableStyle from './table.module.scss'
import tooltipStyles from './tooltip.module.scss'

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
      <div className={stateTableStyle.symbolSpacer} />
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

const StateCellPercent = ({ number, disparity, note }) => {
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
        className={tooltipStyles.tooltip}
      >
        <span>{value}</span>
      </Tooltip>
    )
  }
  if (note) {
    return (
      <Tooltip label={note} className={tooltipStyles.tooltip}>
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
        <StateCellPercent
          number={cellData.value}
          disparity={cellData.disparity}
          note={cellData.note.value}
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
      </tr>
    ))}
  </tbody>
)

export { StateTable, GroupRowHeader, StateTableHeader, Td, StateTableBody }
