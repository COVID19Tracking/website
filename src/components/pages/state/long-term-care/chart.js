import React from 'react'
import { DateTime } from 'luxon'
import { Row, Col } from '~components/common/grid'
import LineChart from '~components/charts/line-chart'
import colors from '~scss/colors.module.scss'
import chartStyles from './chart.module.scss'
import Alert from '~components/common/alert'

const chartProps = {
  height: 180, // these control the dimensions used to render the svg but not the final size
  width: 280, // that is determined by the containing element
  marginBottom: 40,
  marginLeft: 60,
  marginRight: 30,
  xTicks: 3,
  showTicks: 6,
}

const getTotals = state => {
  const categories = ['nh', 'alf', 'lumpedother']
  let totalCases = null
  let totalDeath = null
  categories.forEach(category => {
    if (
      state[`posresstaff_${category}`] ||
      state[`probposresstaff_${category}`]
    ) {
      if (state[`posresstaff_${category}`]) {
        totalCases += state[`posresstaff_${category}`]
      }
      if (state[`probposresstaff_${category}`]) {
        totalCases += state[`probposresstaff_${category}`]
      }
    } else {
      if (state[`posres_${category}`]) {
        totalCases += state[`posres_${category}`]
      }
      if (state[`probposres_${category}`]) {
        totalCases += state[`probposres_${category}`]
      }
      if (state[`posstaff_${category}`]) {
        totalCases += state[`posstaff_${category}`]
      }
      if (state[`probposstaff_${category}`]) {
        totalCases += state[`probposstaff_${category}`]
      }
    }
    if (
      state[`deathresstaff_${category}`] ||
      state[`probdeathresstaff_${category}`]
    ) {
      if (state[`deathresstaff_${category}`]) {
        totalDeath += state[`deathresstaff_${category}`]
      }
      if (state[`probdeathresstaff_${category}`]) {
        totalDeath += state[`probdeathresstaff_${category}`]
      }
    } else {
      if (state[`deathres_${category}`]) {
        totalDeath += state[`deathres_${category}`]
      }
      if (state[`probdeathres_${category}`]) {
        totalDeath += state[`probdeathres_${category}`]
      }
      if (state[`deathstaff_${category}`]) {
        totalDeath += state[`deathstaff_${category}`]
      }
      if (state[`probdeathstaff_${category}`]) {
        totalDeath += state[`probdeathstaff_${category}`]
      }
    }
  })

  return { totalCases, totalDeath }
}

const LongTermCareCharts = ({ data }) => {
  const caseData = []
  const deathData = []

  data.forEach(item => {
    const date = DateTime.fromISO(item.date).toJSDate()
    const { totalCases, totalDeath } = getTotals(item)
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
