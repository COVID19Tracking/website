import React from 'react'
import { Th, Td, Table } from './table'
import { formatDateToString, FormatNumber } from '../utils/format'
import Timezone from './timezone'

// The following two functions are useful for rendering column group styling.

const renderColumnHeaders = columnData =>
  columnData.map(group => {
    if (group.isHidden) return null
    return group.columns.map((column, i) => (
      <Th
        key={`${group.header}-${column.header}-th`}
        header={group.header}
        isFirst={i === 0}
        alignLeft={column.alignLeft || i === 0} // Left-align the column header underneath the group header
        columnWidth={group.columns.length}
        wide={column.wide ? column.wide : false}
      >
        {column.header}
      </Th>
    ))
  })

const renderColumns = columnData =>
  columnData.map(group => {
    if (group.isHidden) return null
    return group.columns.map((column, i) => (
      <Td
        key={`${group.header}-${column.header}-td`}
        isFirst={i === 0}
        alignLeft={column.alignLeft}
      >
        <FormatNumber number={column.data} />
      </Td>
    ))
  })

export default ({ data, lastUpdated, showOutcomes = true }) => {
  const columns = [
    {
      header: 'Tests',
      columns: [
        {
          header: 'Positive',
          alignLeft: !showOutcomes,
          data: data.positive,
        },
        {
          header: 'Negative',
          alignLeft: !showOutcomes,
          data: data.negative,
        },
        {
          header: 'Pending',
          alignLeft: !showOutcomes,
          data: data.pending,
        },
      ],
    },
    {
      header: 'Hospitalized',
      isHidden: !showOutcomes,
      columns: [
        {
          header: 'Currently',
          data: data.hospitalizedCurrently,
        },
        {
          header: 'Cumulative',
          data: data.hospitalizedCumulative,
        },
      ],
    },
    {
      header: 'In ICU',
      isHidden: !showOutcomes,
      columns: [
        {
          header: 'Currently',
          data: data.inIcuCurrently,
        },
        {
          header: 'Cumulative',
          data: data.inIcuCumulative,
        },
      ],
    },
    {
      header: 'On Ventilator',
      isHidden: !showOutcomes,
      columns: [
        {
          header: 'Currently',
          data: data.onVentilatorCurrently,
        },
        {
          header: 'Cumulative',
          data: data.onVentilatorCumulative,
        },
      ],
    },
    {
      header: 'Outcomes',
      columns: [
        {
          header: 'Recovered',
          alignLeft: !showOutcomes,
          data: data.recovered,
        },
        {
          header: 'Deaths',
          alignLeft: !showOutcomes,
          data: data.death,
        },
      ],
    },
    {
      header: 'Total Test Results',
      columns: [
        {
          header: 'Positive + Negative',
          alignLeft: !showOutcomes,
          data: data.totalTestResults,
          wide: true,
        },
      ],
    },
  ]

  return (
    <Table
      tableLabel={
        lastUpdated && (
          <>
            Last updated: {formatDateToString(lastUpdated)} <Timezone />
          </>
        )
      }
    >
      <thead>
        <tr>{renderColumnHeaders(columns)}</tr>
      </thead>
      <tbody>
        <tr>{renderColumns(columns)}</tr>
      </tbody>
    </Table>
  )
}
