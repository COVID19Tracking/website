import React from 'react'
import Screenshots from './screenshots'
import { Th, Td, Table } from '../../common/table'
import { FormatNumber, FormatDate } from '../../utils/format'
import Timezone from '../../common/timezone'
import stateHistoryStyle from './state-history.module.scss'

export default ({ history, screenshots }) => (
  <Table>
    <thead>
      <tr>
        <Th scope="col" alignLeft>
          Date
        </Th>
        <Th scope="col" alignLeft>
          Screenshots (<Timezone />)
        </Th>
        <Th scope="col">New Tests</Th>
        <Th scope="col">Positive</Th>
        <Th scope="col">Negative</Th>
        <Th scope="col">Pending</Th>
        <Th scope="col">Hospitalized</Th>
        <Th scope="col">Deaths</Th>
        <Th scope="col">Total</Th>
      </tr>
    </thead>
    <tbody className={`state-history-table ${stateHistoryStyle.history}`}>
      {history.map(({ node }) => (
        <tr key={`history-${node.dateChecked}`}>
          <Td alignLeft>
            <FormatDate date={node.dateChecked} format="ccc LLL d yyyy" />
          </Td>
          <Td alignLeft>
            <Screenshots date={node.dateChecked} screenshots={screenshots} />
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
