import React from 'react'
import Screenshots from './screenshots'
import Table from '../../common/table'
import formatDate from '../../../utilities/format-date'
import thousands from '../../../utilities/format-thousands'
import stateHistoryStyle from '../../../scss/components/pages/state/history.module.scss'

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
          <td>{formatDate(node.dateChecked)}</td>
          <td>
            <Screenshots date={node.dateChecked} screenshots={screenshots} />
          </td>
          <td>{thousands(node.positive)}</td>
          <td>{thousands(node.negative)}</td>
          <td>{thousands(node.pending)}</td>
          <td>{thousands(node.hospitalized)}</td>
          <td>{thousands(node.death)}</td>
          <td>{thousands(node.totalTestResults)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)
