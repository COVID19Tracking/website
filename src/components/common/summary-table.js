import React from 'react'
import Table from './table'
import thousands from '../../utilities/format-thousands'

export default ({ data }) => (
  <Table>
    <thead>
      <tr>
        <th>Positive</th>
        <th>Negative</th>
        <th>Positive + Negative</th>
        <th>Pending</th>
        <th>Hospitalized</th>
        <th>Death</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{thousands(data.positive)}</td>
        <td>{thousands(data.negative)}</td>
        <td>{thousands(data.posNeg)}</td>
        <td>{thousands(data.pending)}</td>
        <td>{thousands(data.hospitalized)}</td>
        <td>{thousands(data.death)}</td>
        <td>{thousands(data.total)}</td>
      </tr>
    </tbody>
  </Table>
)
