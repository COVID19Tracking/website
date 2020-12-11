import { Link } from 'gatsby'
import React from 'react'
import { FormatNumber } from '~components/utils/format'
import sidebarStyle from './sidebar.module.scss'

const MapNumber = ({ number, label }) => (
  <div className={sidebarStyle.number}>
    <h3 className="a11y-only">{label}</h3>
    <FormatNumber number={number} />
    <p aria-hidden className={sidebarStyle.label}>
      {label}
    </p>
  </div>
)

const Sidebar = ({ state, us }) => (
  <>
    <h2 className={sidebarStyle.header}>Latest totals</h2>
    {state ? (
      <>
        <h3 className={sidebarStyle.stateName}>{state.state.name}</h3>
        <MapNumber
          number={state.state.current.totalTestResults}
          label="Total test results"
        />
        <MapNumber number={state.state.current.positive} label="Cases" />
        <MapNumber number={state.state.current.death} label="Deaths" />
        <Link
          to={`/data/state/${state.state.name}`}
          className={sidebarStyle.link}
        >
          <span className={sidebarStyle.text}>All {state.state.name} data</span>{' '}
          <span aria-hidden>→</span>
        </Link>
      </>
    ) : (
      <>
        <MapNumber number={us.totalTestResults} label="Total test results" />
        <MapNumber number={us.positive} label="Cases" />
        <MapNumber number={us.death} label="Deaths" />
      </>
    )}
  </>
)

export default Sidebar
