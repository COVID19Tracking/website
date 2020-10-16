import React from 'react'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import LineChart from '~components/charts/line-chart'
import TooltipContents from '~components/charts/tooltip-contents'
import colors from '~scss/colors.module.scss'

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

const LongTermCareBarChart = ({ data }) => {
  const chartData = data.map(item => ({
    date: DateTime.fromISO(item.date).toJSDate(),
    deaths:
      item.deathres_other +
      item.deathres_nh +
      item.deathres_ltc +
      item.deathres_alf,
    cases:
      item.posres_other + item.posres_nh + item.posres_ltc + item.posres_alf,
  }))

  return (
    <Row>
      <Col width={[4, 3, 4]}>
        <h3>Cases</h3>
        <LineChart
          data={chartData.map(({ date, cases }) => ({
            date,
            value: cases,
          }))}
          lineColor={colors.colorStrawberry100}
          renderTooltipContents={makeRenderTooltipContents('Cases')}
          {...chartProps}
        />
      </Col>
      <Col width={[4, 3, 4]}>
        <h3>Deaths</h3>
        <LineChart
          data={chartData.map(({ date, deaths }) => ({
            date,
            value: deaths,
          }))}
          lineColor={colors.colorSlate300}
          renderTooltipContents={makeRenderTooltipContents('Deaths')}
          {...chartProps}
        />
      </Col>
    </Row>
  )
}

export default LongTermCareBarChart
