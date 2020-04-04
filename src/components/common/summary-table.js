import React from 'react'
import Table from './table'
import formatNumber from '../../utilities/format-number'
import '../../scss/components/common/summary-table.scss'

export default ({ data, lastUpdated }) => (
  <Table tableLabel={lastUpdated && `Last updated: ${lastUpdated} ET`}>
    <colgroup span="3" />
    <colgroup span="2" />
    <colgroup span="2" />
    <colgroup span="2" />
    <col />
    <col />
    <col />
    <col />
    <thead>
      <tr>
        <th scope="colgroup" colSpan="3">
          Tests
        </th>
        <th scope="colgroup" colSpan="2">
          Hospitalized
        </th>
        <th scope="colgroup" colSpan="2">
          In ICU
        </th>
        <th scope="colgroup" colSpan="2">
          On Ventilator
        </th>
        <td colSpan="3"> </td>
      </tr>
      <tr>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Currently</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Currently</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Currently</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Recovered</th>
        <th scope="col">Deaths</th>
        <th scope="col">
          Total test results <span>(Positive + Negative)</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{formatNumber(data.positive)}</td>
        <td>{formatNumber(data.negative)}</td>
        <td>{formatNumber(data.pending)}</td>
        <td>{formatNumber(data.hospitalizedCurrently)}</td>
        <td>{formatNumber(data.hospitalizedCumulative)}</td>
        <td>{formatNumber(data.inIcuCurrently)}</td>
        <td>{formatNumber(data.inIcuCumulative)}</td>
        <td>{formatNumber(data.onVentilatorCurrently)}</td>
        <td>{formatNumber(data.onVentilatorCumulative)}</td>
        <td>{formatNumber(data.recovered)}</td>
        <td>{formatNumber(data.death)}</td>
        <td>{formatNumber(data.totalTestResults)}</td>
      </tr>
    </tbody>
  </Table>
)
