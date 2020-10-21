/* eslint-disable */
import React from 'react'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import LineChart from '~components/charts/line-chart'
import TooltipContents from '~components/charts/tooltip-contents'
import colors from '~scss/colors.module.scss'
import chartStyles from './chart.module.scss'

const residentColor = colors.colorHoney500
const staffColor = colors.colorPlum600
const staffResColor = colors.colorSlate300

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
  const caseData = [
    {
      color: residentColor,
      stroke: 2,
      label: 'Resident',
      data: [],
    },
    {
      color: staffColor,
      stroke: 2,
      label: 'Staff',
      data: [],
    },
    {
      color: staffResColor,
      stroke: 2,
      label: 'Staff &amp; residents',
      data: [],
    },
  ]
  const deathData = [
    {
      color: residentColor,
      stroke: 2,
      label: 'Resident',
      data: [],
    },
    {
      color: staffColor,
      stroke: 2,
      label: 'Staff',
      data: [],
    },
    {
      color: staffResColor,
      stroke: 2,
      label: 'Staff &amp; residents',
      data: [],
    },
  ]
  data.forEach(item => {
    const date = DateTime.fromISO(item.date).toJSDate()
    caseData[0].data.push({
      date,
      value:
        item.posres_other + item.posres_nh + item.posres_ltc + item.posres_alf,
    })
    caseData[1].data.push({
      date,
      value:
        item.posstaff_other +
        item.posstaff_nh +
        item.posstaff_ltc +
        item.posstaff_alf,
    })
    caseData[2].data.push({
      date,
      value:
        item.posresstaff_other +
        item.posresstaff_nh +
        item.posresstaff_ltc +
        item.posresstaff_alf,
    })

    deathData[0].data.push({
      date,
      value:
        item.deathres_other +
        item.deathres_nh +
        item.deathres_ltc +
        item.deathres_alf,
    })
    deathData[1].data.push({
      date,
      value:
        item.deathstaff_other +
        item.deathstaff_nh +
        item.deathstaff_ltc +
        item.deathstaff_alf,
    })
    deathData[2].data.push({
      date,
      value:
        item.deathresstaff_other +
        item.deathresstaff_nh +
        item.deathresstaff_ltc +
        item.deathresstaff_alf,
    })
  })

  return (
    <>
      <Row className={chartStyles.charts}>
        <Col width={[4, 3, 4]}>
          <h3>Cases</h3>
          <LineChart
            data={caseData}
            lineColor={colors.colorStrawberry100}
            renderTooltipContents={makeRenderTooltipContents('Cases')}
            {...chartProps}
          />
        </Col>
        <Col width={[4, 3, 4]}>
          <h3>Deaths</h3>
          {
            <LineChart
              data={deathData}
              lineColor={colors.colorSlate300}
              renderTooltipContents={makeRenderTooltipContents('Deaths')}
              {...chartProps}
            />
          }
        </Col>
      </Row>
      <ul className={chartStyles.legend} aria-hidden>
        <li>
          <span
            className={chartStyles.legendColor}
            style={{ background: residentColor }}
          />{' '}
          Residents
        </li>
        <li>
          <span
            className={chartStyles.legendColor}
            style={{ background: staffColor }}
          />{' '}
          Staff
        </li>
        <li>
          <span
            className={chartStyles.legendColor}
            style={{ background: staffResColor }}
          />{' '}
          Staff &amp; residents
        </li>
      </ul>
    </>
  )
}

export default LongTermCareCharts
