import React from 'react'
import Table from './table'
import { FormatNumber } from './format'

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
        <td>
          <FormatNumber FormatNumber={data.positive} />
        </td>
        <td>
          <FormatNumber FormatNumber={data.negative} />
        </td>
        <td>
          <FormatNumber FormatNumber={data.pending} />
        </td>
        {showOutcomes && (
          <>
            <td>
              <FormatNumber FormatNumber={data.hospitalizedCurrently} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.hospitalizedCumulative} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.inIcuCurrently} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.inIcuCumulative} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.onVentilatorCurrently} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.onVentilatorCumulative} />
            </td>
            <td>
              <FormatNumber FormatNumber={data.recovered} />
            </td>
          </>
        )}
        <td>
          <FormatNumber FormatNumber={data.death} />
        </td>
        <td>
          <FormatNumber FormatNumber={data.totalTestResults} />
        </td>
      </tr>
    </tbody>
  </Table>
)
