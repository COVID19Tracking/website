import React from 'react'
import { Table, Th, Td } from '~components/common/table'
import Percent from './percent'
import stateTableStyle from './table.module.scss'

const StateTable = Table

const GroupRowHeader = ({ children }) => (
  <Th additionalClass={stateTableStyle.group} scope="row">
    {children}
  </Th>
)

const StateTableHeader = ({ groupTitle }) => (
  <thead>
    <tr>
      <Th additionalClass={stateTableStyle.group}>{groupTitle}</Th>
      <Th additionalClass={stateTableStyle.percent} isFirst>
        Percentage of population
      </Th>
      <Th additionalClass={stateTableStyle.percent}>Percentage of cases</Th>
      <Th additionalClass={stateTableStyle.percent}>Percentage of deaths</Th>
    </tr>
  </thead>
)

const StateTableBody = ({ rows }) => (
  <tbody>
    {rows.map(row => (
      <tr>
        <GroupRowHeader>{row.group}</GroupRowHeader>
        <Td isFirst>
          <Percent number={row.population} />
        </Td>
        <Td>
          <Percent number={row.positive} />
        </Td>
        <Td>
          <Percent number={row.death} />
        </Td>
      </tr>
    ))}
  </tbody>
)

export { StateTable, GroupRowHeader, StateTableHeader, Td, StateTableBody }
