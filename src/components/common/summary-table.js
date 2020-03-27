import React from 'react'
import Table from './table'
import '../../scss/components/common/summary-table.scss'
import thousands from '../../utilities/format-thousands'

export default ({ data }) => (
  <Table>
    <caption class="sr-only">{/* todo include captions */}</caption>
    <thead>
      <colgroup span="3"></colgroup>
      <colgroup span="2"></colgroup>
      <colgroup span="2"></colgroup>
      <colgroup span="2"></colgroup>
      <col></col>
      <col></col>
      <col></col>
      <col></col>
      <tr>
        <th scope="colgroup" colspan="3">Tests</th>
        <th scope="colgroup" colspan="2">Hospitalized</th>
        <th scope="colgroup" colspan="2">In ICU</th>
        <th scope="colgroup" colspan="2">On Ventilator</th>
        <td colspan="2"></td>
      </tr>
      <tr>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        <th scope="col">Currently</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Currently</th>
        <th scope="col">Cumulative</th>
        <th scope="col">Recovered</th>
        <th scope="col">Discharged</th>
        <th scope="col">Deaths</th>
        <th scope="col">Total test results <span>(Positive + Negative)</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{data.positive ? thousands(data.positive) : 'N/A'}</td>
        <td>{data.negative ? thousands(data.negative) : 'N/A'}</td>
        <td>{data.pending ? thousands(data.pending) : 'N/A'}</td>
        <td>#,###{/* todo configure API */}</td>
        <td>{data.hospitalized ? thousands(data.hospitalized) : 'N/A'}</td>
        <td>#,###{/* todo configure API */}</td>
        <td>#,###{/* todo configure API */}</td>
        <td>#,###{/* todo configure API */}</td>
        <td>#,###{/* todo configure API */}</td>
        <td>{data.death ? thousands(data.death) : 'N/A'}</td>
        <td>{data.total ? thousands(data.total) : 'N/A'}</td>
      </tr>
    </tbody>
  </Table>
)
