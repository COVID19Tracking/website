import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { DateTime } from 'luxon'
import { Number, Header, RelatedPost } from '../sidebar'
import LineChart from '~components/charts/line-chart'
import sidebarStyle from './sidebar.module.scss'
import colors from '~scss/colors.module.scss'
import { Row } from '~components/common/grid'

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
      <h3>New cases</h3>
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

const Sidebar = ({ state, us, inModal = false, relatedPost = false }) => (
  <div
    className={classnames(
      sidebarStyle.sidebar,
      inModal && sidebarStyle.inModal,
    )}
  >
    <Header>Latest totals</Header>
    {state ? (
      <>
        <h3 className={sidebarStyle.stateName}>
          <Link to={`/data/state/${state.state.childSlug.slug}`}>
            {state.state.name}
          </Link>
        </h3>
        <Row>
          <Number
            number={state.state.current.totalTestResults}
            label="Total test results"
          />
          <Number number={state.state.current.positive} label="Cases" />
          <Number number={state.state.current.death} label="Deaths" />
        </Row>

        <Chart history={state.state.history} />
        <Link
          to={`/data/state/${state.state.childSlug.slug}`}
          className={sidebarStyle.link}
        >
          <span className={sidebarStyle.text}>All state data</span>{' '}
          <span aria-hidden>→</span>
        </Link>
      </>
    ) : (
      <>
        <Row>
          <Number number={us.totalTestResults} label="Total test results" />
          <Number number={us.positive} label="Cases" />
          <Number number={us.death} label="Deaths" />
        </Row>
        {relatedPost && (
          <RelatedPost
            title={relatedPost.title}
            slug={relatedPost.slug}
            date={relatedPost.publishDate}
          />
        )}
      </>
    )}
  </div>
)

export default Sidebar
