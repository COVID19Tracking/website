import React from 'react'
import Screenshots from './screenshots'
import { Th, Td, Table } from '~components/common/table'
import { FormatNumber, FormatDate } from '~components/utils/format'
import Timezone from '~components/common/timezone'
import stateHistoryStyle from './state-history.module.scss'

export default ({ history, screenshots }) => (
  <Table>
    <thead>
      <tr>
        <Th alignLeft>Date</Th>
        <Th alignLeft>
          Screenshots (<Timezone />)
        </Th>
        <Th>New Tests</Th>
        <Th>Positive</Th>
        <Th>Negative</Th>
        <Th>Pending</Th>
        <Th>Hospitalized</Th>
        <Th>Deaths</Th>
        <Th>Total</Th>
      </tr>
    </thead>
    <tbody className={`state-history-table ${stateHistoryStyle.history}`}>
      {history.map(({ node }) => (
        <tr key={`history-${node.dateChecked}`}>
          <Td alignLeft>
            <FormatDate date={node.date} format="ccc LLL d yyyy" />
          </Td>
          <Td alignLeft>
            <Screenshots date={node.date} screenshots={screenshots} />
          </Td>
          <Td>
            <FormatNumber number={node.totalTestResultsIncrease} />
          </Td>
          <Td>
            <FormatNumber number={node.positive} />
          </Td>
          <Td>
            <FormatNumber number={node.negative} />
          </Td>
          <Td>
            <FormatNumber number={node.pending} />
          </Td>
          <Td>
            <FormatNumber number={node.hospitalized} />
          </Td>
          <Td>
            <FormatNumber number={node.death} />
          </Td>
          <Td>
            <FormatNumber number={node.totalTestResults} />
          </Td>
        </tr>
      ))}
    </tbody>
  </Table>
)
