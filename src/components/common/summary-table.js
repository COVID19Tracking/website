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
        <td>{data.positive ? thousands(data.positive) : 'N/A'}</td>
        <td>{data.negative ? thousands(data.negative) : 'N/A'}</td>
        <td>{data.posNeg ? thousands(data.posNeg) : 'N/A'}</td>
        <td>{data.pending ? thousands(data.pending) : 'N/A'}</td>
        <td>{data.hospitalized ? thousands(data.hospitalized) : 'N/A'}</td>
        <td>{data.death ? thousands(data.death) : 'N/A'}</td>
        <td>{data.total ? thousands(data.total) : 'N/A'}</td>
      </tr>
    </tbody>
  </Table>
)
