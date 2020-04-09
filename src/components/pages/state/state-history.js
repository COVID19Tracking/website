import React from 'react'
import Screenshots from './screenshots'
import Table from '../../common/table'
import { FormatNumber, FormatDate } from '../../common/format'
import stateHistoryStyle from './state-history.module.scss'

export default ({ history, screenshots }) => (
  <Table>
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Screenshot</th>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Hospitalized</th>
        <th scope="col">Deaths</th>
        <th scope="col">Total</th>
      </tr>
    </thead>
    <tbody className={`state-history-table ${stateHistoryStyle.history}`}>
      {history.map(({ node }) => (
        <tr key={`history-${node.dateChecked}`}>
          <td>
            <FormatDate date={node.dateChecked} />
          </td>
          <td>
            <Screenshots date={node.dateChecked} screenshots={screenshots} />
          </td>
          <td>
            <FormatNumber number={node.positive} />
          </td>
          <td>
            <FormatNumber number={node.negative} />
          </td>
          <td>
            <FormatNumber number={node.pending} />
          </td>
          <td>
            <FormatNumber number={node.hospitalized} />
          </td>
          <td>
            <FormatNumber number={node.death} />
          </td>
          <td>
            <FormatNumber number={node.totalTestResults} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)
