import React from 'react'
import { Th, Td, Table } from './table'
import { formatDateToString, FormatNumber } from '../utils/format'
import Timezone from './timezone'

export default ({ data, lastUpdated, showOutcomes = true }) => (
  <Table
    tableLabel={
      lastUpdated && (
        <>
          Last updated: {formatDateToString(lastUpdated)} <Timezone />
        </>
      )
    }
  >
    <colgroup span="3" />
    {showOutcomes ? (
      <>
        <colgroup span="2" />
        <colgroup span="2" />
        <colgroup span="2" />
        <colgroup span="2" />
        <colgroup span="1" />
      </>
    ) : (
      <>
        <colgroup span="1" />
        <colgroup span="1" />
        <colgroup span="1" />
      </>
    )}
    <thead>
      <tr>
        <Th scope="colgroup" colSpan="3">
          Tests
        </Th>
        {showOutcomes && (
          <>
            <Th scope="colgroup" colSpan="2">
              Hospitalized
            </Th>
            <Th scope="colgroup" colSpan="2">
              In ICU
            </Th>
            <Th scope="colgroup" colSpan="2">
              On Ventilator
            </Th>
          </>
        )}
        <Th scope="colgroup" colSpan={showOutcomes ? '2' : '1'}>
          Outcomes
        </Th>
        <Th scope="colgroup">Total Test Results</Th>
      </tr>
      <tr>
        <Th scope="col" alignLeft={showOutcomes}>
          Positive
        </Th>
        <Th scope="col">Negative</Th>
        <Th scope="col">Pending</Th>
        {showOutcomes && (
          <>
            <Th scope="col" alignLeft>
              Currently
            </Th>
            <Th scope="col">Cumulative</Th>
            <Th scope="col" alignLeft>
              Currently
            </Th>
            <Th scope="col">Cumulative</Th>
            <Th scope="col" alignLeft>
              Currently
            </Th>
            <Th scope="col">Cumulative</Th>
            <Th scope="col" alignLeft>
              Recovered
            </Th>
          </>
        )}
        <Th scope="col">Deaths</Th>
        <Th scope="col" alignLeft={showOutcomes}>
          Positive + Negative
        </Th>
      </tr>
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
