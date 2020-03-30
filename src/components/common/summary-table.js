import React, { useEffect } from 'react'
import Tablesaw from 'tablesaw'
import Table from './table'
import thousands from '../../utilities/format-thousands'
import '../../scss/components/common/summary-table.scss'
import 'tablesaw/dist/tablesaw.css'

export default ({ data }) => {
  useEffect(() => {
    Tablesaw.init()
  }, [])

  return (
    <div className="tablesaw-overflow">
      <Table className="full tablesaw" tablesawMode="columntoggle">
        <caption className="sr-only">{/* todo include captions */}</caption>
        <thead>
          <tr>
            <th colSpan="3" data-tablesaw-priority="1" scope="col">
              Tests
            </th>
            <th colSpan="2" data-tablesaw-priority="2" scope="colgroup">
              Hospitalized
            </th>
            <th colSpan="2" data-tablesaw-priority="2" scope="colgroup">
              In ICU
            </th>
            <th colSpan="2" data-tablesaw-priority="1" scope="colgroup">
              On Ventilator
            </th>
            <th rowSpan="2" data-tablesaw-priority="persist" scope="col">
              Deaths
            </th>
            <th rowSpan="2" data-tablesaw-priority="persist" scope="col">
              Total test results (Positive + Negative)
            </th>
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
    </div>
  )
}
