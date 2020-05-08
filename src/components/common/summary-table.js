import React from 'react'
import { Th, Td, Table } from './table'
import { formatDateToString, FormatNumber } from '../utils/format'
import Timezone from './timezone'

const renderColumnHeaders = columnData =>
  columnData.map(group =>
    group.columns.map((column, i) => (
      <Th header={group.header} showHeader={i === 0}>
        {column}
      </Th>
    )),
  )

export default ({ data, lastUpdated, showOutcomes = true }) => {
  const columns = [
    {
      header: 'Tests',
      columns: ['Positive', 'Negative', 'Pending'],
    },
    {
      header: 'Hospitalized',
      columns: ['Currently', 'Cumulative'],
    },
    {
      header: 'In ICU',
      columns: ['Currently', 'Cumulative'],
    },
    {
      header: 'On Ventilator',
      columns: ['Currently', 'Cumulative'],
    },
    {
      header: 'Outcomes',
      columns: ['Recovered', 'Deaths'],
    },
    {
      header: 'Total Test Results',
      columns: ['Positive + Negative'],
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
        <tr>
          <Td>
            <FormatNumber number={data.positive} />
          </Td>
          <Td>
            <FormatNumber number={data.negative} />
          </Td>
          <Td>
            <FormatNumber number={data.pending} />
          </Td>
          {showOutcomes && (
            <>
              <Td>
                <FormatNumber number={data.hospitalizedCurrently} />
              </Td>
              <Td>
                <FormatNumber number={data.hospitalizedCumulative} />
              </Td>
              <Td>
                <FormatNumber number={data.inIcuCurrently} />
              </Td>
              <Td>
                <FormatNumber number={data.inIcuCumulative} />
              </Td>
              <Td>
                <FormatNumber number={data.onVentilatorCurrently} />
              </Td>
              <Td>
                <FormatNumber number={data.onVentilatorCumulative} />
              </Td>
              <Td>
                <FormatNumber number={data.recovered} />
              </Td>
            </>
          )}
          <Td>
            <FormatNumber number={data.death} />
          </Td>
          <Td>
            <FormatNumber number={data.totalTestResults} />
          </Td>
        </tr>
      </tbody>
    </Table>
  )
}
