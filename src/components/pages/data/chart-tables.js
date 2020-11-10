import React from 'react'
import { Table, Td, Th } from '~components/common/table'
import { FormatDate } from '~components/utils/format'

// const ChartTables = ({history, usHistory,annotations,testSource,testUnits}) => (

const perMillion = percent => Math.round(percent * 1000000)

const ChartTables = ({ history, usHistory }) => (
  <>
    <h2>New cases</h2>
    <Table>
      <thead>
        <tr>
          <Th header alignLeft>
            Date
          </Th>
          <Th isFirst>State</Th>
          <Th>State 7-day average</Th>
          <Th>State 1/million</Th>
          <Th isFirst>National 1/million</Th>
        </tr>
      </thead>
      <tbody>
        {history.map(row => (
          <tr key={`cases-${row.date}`}>
            <Td alignLeft>
              <FormatDate date={row.date} format="LLL d yyyy" />
            </Td>
            <Td isFirst>{row.positiveIncrease}</Td>
            <Td>Avg</Td>
            <Td>{perMillion(row.childPopulation.positiveIncrease.percent)}</Td>
            <Td>
              {perMillion(
                usHistory.find(item => item.date === row.date).childPopulation
                  .positiveIncrease.percent,
              )}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
)

export default ChartTables
