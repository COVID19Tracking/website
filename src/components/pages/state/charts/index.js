import React, { useState, useMemo } from 'react'

import BarChart from '~components/charts/bar-chart'

import { parseDate } from '~utilities/visualization'

import colors from '~scss/colors.module.scss'

import { Row, Col } from '~components/common/grid'

import Toggle from '~components/common/toggle'

// import chartsStyles from './charts.module.scss'

// TODO: optimize if this slows down build (use rolling window)
const dailyAverage = (history, field, range = 7) => {
  if (!history) return null
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

export default ({ history, usHistory }) => {
  // Change below to update range of chart
  const NUM_DAYS = 90

  const [usePerCap, setUsePerCap] = useState(false)

  const data = [...history].slice(0, NUM_DAYS).sort((a, b) => a.date - b.date)
  // eslint-disable-next-line no-unused-vars
  const usData = useMemo(
    () =>
      usHistory &&
      [...usHistory].slice(0, NUM_DAYS).sort((a, b) => a.date - b.date),
    [usHistory, usePerCap],
  )

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
    <>
      <Toggle
        options={['Totals', 'Per capita']}
        state={usePerCap}
        setState={setUsePerCap}
      />
      <Row>
        <Col width={colWidth}>
          <h5>New tests</h5>
          <BarChart
            data={getDataForField(data, 'totalTestResultsIncrease')}
            lineData={dailyAverage(data, 'totalTestResultsIncrease')}
            refLineData={dailyAverage(
              data,
              'totalTestResultsIncrease',
            ).map(({ date, value }) => ({ date, value: value / 4 }))}
            fill={colors.colorPlum300}
            lineColor={colors.colorPlum600}
            {...props}
          />
        </Col>
        <Col width={colWidth}>
          <h5>New cases</h5>
          <BarChart
            data={getDataForField(data, 'positiveIncrease')}
            lineData={dailyAverage(data, 'positiveIncrease')}
            refLineData={dailyAverage(
              data,
              'positiveIncrease',
            ).map(({ date, value }) => ({ date, value: value / 2 }))}
            fill={colors.colorHoney300}
            lineColor={colors.colorHoney600}
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
                fill={colors.colorHoney300}
                lineColor={colors.colorHoney600}
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
            fill={colors.colorSlate300}
            lineColor={colors.colorSlate600}
            {...props}
          />
        </Col>
      </Row>
    </>
  )
}
