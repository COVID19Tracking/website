import React from 'react'
import Table from './table'
import '../../scss/components/common/summary-table.scss'
import thousands from '../../utilities/format-thousands'

export default ({ data, lastUpdated, showOutcomes = true }) => (
  <Table tableLabel={lastUpdated && `Last updated: ${lastUpdated} ET`}>
    <colgroup span="3" />
    {showOutcomes && (
      <>
        <colgroup span="2" />
        <colgroup span="2" />
        <colgroup span="2" />
        <col />
      </>
    )}
    <col />
    <col />
    <thead>
      <tr>
        <th scope="colgroup" colSpan="3">
          Tests
        </th>
        {showOutcomes ? (
          <>
            <th scope="colgroup" colSpan="2">
              Hospitalized
            </th>
            <th scope="colgroup" colSpan="2">
              In ICU
            </th>
            <th scope="colgroup" colSpan="2">
              On Ventilator
            </th>
            <td colSpan="3"> </td> {/* 3 includes recovered */}
          </>
        ) : (
          <td colSpan="2"> </td>
        )}
      </tr>
      <tr>
        <th scope="col">Positive</th>
        <th scope="col">Negative</th>
        <th scope="col">Pending</th>
        {showOutcomes && (
          <>
            <th scope="col">Currently</th>
            <th scope="col">Cumulative</th>
            <th scope="col">Currently</th>
            <th scope="col">Cumulative</th>
            <th scope="col">Currently</th>
            <th scope="col">Cumulative</th>
            <th scope="col">Recovered</th>
          </>
        )}
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
        {showOutcomes && (
          <>
            <td>
              {data.hospitalizedCurrently
                ? thousands(data.hospitalizedCurrently)
                : 'N/A'}
            </td>
            <td>
              {data.hospitalizedCumulative
                ? thousands(data.hospitalizedCumulative)
                : 'N/A'}
            </td>
            <td>
              {data.inIcuCurrently ? thousands(data.inIcuCurrently) : 'N/A'}
            </td>
            <td>
              {data.inIcuCumulative ? thousands(data.inIcuCumulative) : 'N/A'}
            </td>
            <td>
              {data.onVentilatorCurrently
                ? thousands(data.onVentilatorCurrently)
                : 'N/A'}
            </td>
            <td>
              {data.onVentilatorCumulative
                ? thousands(data.onVentilatorCumulative)
                : 'N/A'}
            </td>
            <td>{data.recovered ? thousands(data.recovered) : 'N/A'}</td>
          </>
        )}
        <td>{data.death ? thousands(data.death) : 'N/A'}</td>
        <td>
          {data.totalTestResults ? thousands(data.totalTestResults) : 'N/A'}
        </td>
      </tr>
    </tbody>
  </Table>
)
