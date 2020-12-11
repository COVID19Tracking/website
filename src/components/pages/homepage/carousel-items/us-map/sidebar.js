import { Link } from 'gatsby'
import React from 'react'
import { DateTime } from 'luxon'
import { FormatNumber } from '~components/utils/format'
import sidebarStyle from './sidebar.module.scss'
import LineChart from '~components/charts/line-chart'
import colors from '~scss/colors.module.scss'

const chartProps = {
  height: 180,
  width: 200,
  marginBottom: 40,
  marginLeft: 30,
  marginRight: 0,
  xTicks: 3,
  showTicks: 6,
}

const Chart = ({ history }) => {
  const caseData = []

  history.forEach((item, key) => {
    if (key > history.length - 7) {
      return
    }
    let sum = 0
    for (let i = 0; i < 7; i += 1) {
      sum += history[key + i].positiveIncrease
    }
    caseData.push({
      date: DateTime.fromISO(item.date).toJSDate(),
      value: sum / 7,
    })
  })

  return (
    <LineChart
      data={[
        {
          color: colors.colorStrawberry200,
          stroke: 2,
          label: 'Cases',
          data: caseData,
        },
      ]}
      {...chartProps}
    />
  )
}

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
        <Chart history={state.state.history} />
        <Link
          to={`/data/state/${state.state.name}`}
          className={sidebarStyle.link}
        >
          <span className={sidebarStyle.text}>All state data</span>{' '}
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
