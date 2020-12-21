import React from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'

const Table = ({ states, metric, us }) => (
  <div className="a11y-only">
    <Link to={`#skip-state-list-${slugify(metric.title)}`}>
      Skip the list of states
    </Link>
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>{metric.title}</th>
          <th>Total test results</th>
          <th>Total cases</th>
          <th>Currently hospitalized</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>National total</td>
          <td>{Math.round(us.value)}</td>
          <td>{us.current.totalTestResults}</td>
          <td>{us.current.positive}</td>
          <td>N/A</td>
          <td>{us.current.death}</td>
        </tr>
        {states.map(state => (
          <tr>
            <td>
              <Link to={`/data/state/${state.childSlug.slug}`}>
                {state.name}
              </Link>
            </td>
            <td>{Math.round(state.value)}</td>
            <td>{state.current.totalTestResults}</td>
            <td>{state.current.positive}</td>
            <td>{state.current.hospitalizedCurrently}</td>
            <td>{state.current.death}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div id={`skip-state-list-${slugify(metric.title)}`} />
  </div>
)

export default Table
