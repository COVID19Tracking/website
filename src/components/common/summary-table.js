import React from 'react'
import { Th, Td, Table } from './table'
import { FormatNumber } from '~components/utils/format'
import Timezone from './timezone'

// The following two functions are useful for rendering column group styling.

const renderColumnHeaders = columnData =>
  columnData.map(group => {
    if (group.isHidden) return null
    return group.columns.map((column, i) => (
      <>
        {column.isHidden ? null : (
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
        )}
      </>
    ))
  })

const renderColumns = columnData =>
  columnData.map(group => {
    if (group.isHidden) return null
    return group.columns.map((column, i) => (
      <>
        {column.isHidden ? null : (
          <Td
            key={`${group.header}-${column.header}-td`}
            isFirst={i === 0}
            alignLeft={column.alignLeft}
          >
            <FormatNumber number={column.data} />
          </Td>
        )}
      </>
    ))
  })

export default ({
  data,
  lastUpdated,
  showFootnote = false,
  usData = false,
}) => {
  const columns = [
    {
      header: `Cases${showFootnote ? ' *' : ''}`,
      columns: [
        {
          header: null,
          alignLeft: !usData,
          data: data.positive,
        },
      ],
    },
    {
      header: 'Tests',
      columns: [
        {
          header: 'Negative',
          alignLeft: !usData,
          data: data.negative,
        },
        {
          header: 'Pending',
          alignLeft: !usData,
          data: data.pending,
        },
      ],
    },
    {
      header: 'Hospitalized',
      columns: [
        {
          header: 'Currently',
          data: data.hospitalizedCurrently,
        },
        {
          header: 'Cumulative',
          data: data.hospitalizedCumulative,
          isHidden: usData,
        },
      ],
    },
    {
      header: 'In ICU',
      isHidden: !!usData,
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
      isHidden: !!usData,
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
          data: data.recovered,
        },
        {
          header: 'Deaths',
          data: data.death,
        },
      ],
    },
    {
      header: 'Total Test Results',
      columns: [
        {
          header: 'Positive + Negative',
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
            State’s last reported update time: {lastUpdated} <Timezone />
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
