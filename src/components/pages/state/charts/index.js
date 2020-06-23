import React from 'react'

import BarChart from '~components/charts/bar-chart'

import {
  deathsBarColor,
  positiveColor,
  totalColor,
  parseDate,
} from '~utilities/visualization'

import { Row, Col } from '~components/common/grid'

// import chartsStyles from './charts.module.scss'

// TODO: optimize if this slows down build (use rolling window)
const dailyAverage = (history, field, range = 7) => {
  const average = []
  history.forEach((row, rowIndex) => {
    const pastRows = []
    let pastIndex = rowIndex
    while (pastIndex >= 0 && pastIndex > rowIndex - range) {
      pastRows.push(history[pastIndex][field])
      pastIndex -= 1
    }
    average.push({
      date: parseDate(row.date),
      value: pastRows.reduce((a, b) => a + b, 0) / pastRows.length,
    })
  })
  return average
}

// must be of format:
//  {
//   date: Date
//   value: number
// }
const getDataForField = (data, field) => {
  return data.map(d => ({
    date: parseDate(d.date),
    value: d[field],
  }))
}

// we need a combined bar + line chart

export default ({ history }) => {
  // Change below to update range of chart
  const NUM_DAYS = 90
  const data = [...history]
    .slice(0, NUM_DAYS)
    // .slice(history.length - NUM_DAYS, history.length)
    .sort((a, b) => a.date - b.date)

  const hasHospitalizationData = history[0].hospitalized !== null

  const props = {
    height: 300,
    width: 300,
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 10,
    marginTop: 10,
    xTicks: 3,
    showTicks: 6,
  }
  const colWidth = [4, 3, 3]

  return (
    <Row>
      <Col width={colWidth}>
        <h5>New tests</h5>
        <BarChart
          data={getDataForField(data, 'totalTestResultsIncrease')}
          lineData={dailyAverage(data, 'totalTestResultsIncrease')}
          fill={totalColor}
          {...props}
        />
      </Col>
      <Col width={colWidth}>
        <h5>New cases</h5>
        <BarChart
          data={getDataForField(data, 'positiveIncrease')}
          lineData={dailyAverage(data, 'positiveIncrease')}
          fill={positiveColor}
          {...props}
        />
      </Col>
      <Col width={colWidth}>
        {hasHospitalizationData && (
          <>
            <h5>New hospitalizations</h5>
            <BarChart
              data={getDataForField(data, 'hospitalizedIncrease')}
              lineData={dailyAverage(data, 'hospitalizedIncrease')}
              fill={positiveColor}
              {...props}
            />
          </>
        )}
      </Col>
      <Col width={colWidth}>
        <h5>New deaths</h5>
        <BarChart
          data={getDataForField(data, 'deathIncrease')}
          lineData={dailyAverage(data, 'deathIncrease')}
          fill={deathsBarColor}
          {...props}
        />
      </Col>
    </Row>
  )
}
