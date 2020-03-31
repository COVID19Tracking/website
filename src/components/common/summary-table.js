import React from 'react'
import Table from './table'
import '../../scss/components/common/summary-table.scss'
import thousands from '../../utilities/format-thousands'

export default ({ data }) => (
  <Table>
    <colgroup span="3" />
    <colgroup span="2" />
    <colgroup span="2" />
    <colgroup span="2" />
    <col />
    <col />
    <col />
    <col />
    <caption className="sr-only">{/* todo include captions */}</caption>
    <thead>
      <tr>
        <th scope="colgroup" colSpan="3">
          Tests
        </th>
        <th scope="colgroup" colSpan="1">
          Hospitalized
        </th>
        <td colSpan="2" />
      </tr>
      <tr>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Deaths</th>
        <th scope="col">
          Total test results <span>(Positive + Negative)</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{data.positive ? thousands(data.positive) : 'N/A'}</td>
        <td>{data.negative ? thousands(data.negative) : 'N/A'}</td>
        <td>{data.pending ? thousands(data.pending) : 'N/A'}</td>
        <td>{data.hospitalized ? thousands(data.hospitalized) : 'N/A'}</td>
        <td>{data.death ? thousands(data.death) : 'N/A'}</td>
        <td>{data.total ? thousands(data.total) : 'N/A'}</td>
      </tr>
    </tbody>
  </Table>
)
