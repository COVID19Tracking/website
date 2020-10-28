/* eslint-disable */
import React from 'react'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import LineChart from '~components/charts/line-chart'
import TooltipContents from '~components/charts/tooltip-contents'
import colors from '~scss/colors.module.scss'
import chartStyles from './chart.module.scss'
import Alert from '~components/common/alert'

const makeRenderTooltipContents = text => d => (
  <TooltipContents
    date={d.date}
    items={[
      {
        text: <>{text}</>,
        value: d.value,
      },
    ]}
  />
)

const chartProps = {
  height: 180, // these control the dimensions used to render the svg but not the final size
  width: 280, // that is determined by the containing element
  marginBottom: 40,
  marginLeft: 60,
  marginRight: 30,
  xTicks: 3,
  showTicks: 6,
}

const LongTermCareCharts = ({ data }) => {
  const caseData = []
  const deathData = []

  data.forEach(item => {
    const date = DateTime.fromISO(item.date).toJSDate()
    let totalCases = 0
    let totalDeath = 0
    Object.keys(item).forEach(key => {
      if (key.search(/posres|posstaff/) > -1) {
        totalCases += item[key]
      }
      if (key.search(/deathres|deathstaff/) > -1) {
        totalDeath += item[key]
      }
    })
    caseData.push({
      date,
      value: totalCases,
    })
    deathData.push({
      date,
      value: totalDeath,
    })
  })

  return (
    <>
      <Row className={chartStyles.charts}>
        <Col width={[4, 3, 4]}>
          <h3>Cases</h3>

          {caseData.filter(item => item.value).length ? (
            <LineChart
              data={[
                {
                  color: colors.colorStrawberry200,
                  stroke: 2,
                  label: 'Cases',
                  data: caseData,
                },
              ]}
              renderTooltipContents={makeRenderTooltipContents('Cases')}
              {...chartProps}
            />
          ) : (
            <Alert>We do not have enough data to chart cases.</Alert>
          )}
        </Col>
        <Col width={[4, 3, 4]}>
          <h3>Deaths</h3>
          {deathData.filter(item => item.value).length ? (
            <LineChart
              data={[
                {
                  color: colors.colorSlate700,
                  stroke: 2,
                  label: 'Deaths',
                  data: deathData,
                },
              ]}
              renderTooltipContents={makeRenderTooltipContents('Deaths')}
              {...chartProps}
            />
          ) : (
            <Alert>We do not have enough data to chart deaths.</Alert>
          )}
        </Col>
      </Row>
    </>
  )
}

export default LongTermCareCharts
