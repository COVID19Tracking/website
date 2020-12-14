import { Link } from 'gatsby'
import React from 'react'
import { DateTime } from 'luxon'
import { Number, Header } from '../sidebar'
import LineChart from '~components/charts/line-chart'
import sidebarStyle from './sidebar.module.scss'
import colors from '~scss/colors.module.scss'
import { Row, Col } from '~components/common/grid'

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
    <div className={sidebarStyle.chart}>
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
    </div>
  )
}

const Sidebar = ({ state, us }) => (
  <div className={sidebarStyle.sidebar}>
    <Header>Latest totals</Header>
    {state ? (
      <>
        <h3 className={sidebarStyle.stateName}>{state.state.name}</h3>
        <Row>
          <Col width={[4, 2, 12]}>
            <Number
              number={state.state.current.totalTestResults}
              label="Total test results"
            />
          </Col>
          <Col width={[4, 2, 12]}>
            <Number number={state.state.current.positive} label="Cases" />
          </Col>
          <Col width={[4, 2, 12]}>
            <Number number={state.state.current.death} label="Deaths" />
          </Col>
        </Row>

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
      <Row>
        <Col width={[4, 2, 12]}>
          <Number number={us.totalTestResults} label="Total test results" />
        </Col>
        <Col width={[4, 2, 12]}>
          <Number number={us.positive} label="Cases" />
        </Col>
        <Col width={[4, 2, 12]}>
          <Number number={us.death} label="Deaths" />
        </Col>
      </Row>
    )}
  </div>
)

export default Sidebar
