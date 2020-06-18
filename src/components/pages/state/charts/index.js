import React from 'react'

import BarChart from '../../../charts/bar-chart'

import {
  deathsBarColor,
  positiveColor,
  totalColor,
  parseDate,
} from '~utilities/visualization'

import chartsStyles from './charts.module.scss'

// should probably increase the efficiency of this to speed up build
// currently O(n*range) where n is length of history
// could make it O(2*n) quite easily
// eslint-disable-next-line no-unused-vars
const dailyAverage = (history, field, range = 7) => {
  const average = []
  history.forEach((row, rowIndex) => {
    const pastRows = [row[field]]
    let pastIndex = rowIndex
    while (pastIndex >= 0 && pastIndex >= rowIndex - range) {
      pastRows.push(history[pastIndex][field])
      pastIndex -= 1
    }
    average.push(pastRows.reduce((a, b) => a + b, 0) / pastRows.length)
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
  const data = history.sort((a, b) => a.date - b.date)
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

  // eslint-disable-next-line no-debugger
  debugger
  return (
    <div className={chartsStyles.chartsContainer}>
      <BarChart
        data={getDataForField(data, 'totalTestResultsIncrease')}
        lineData={dailyAverage(data, 'totalTestResultsIncrease')}
        fill={totalColor}
        {...props}
      />
      <BarChart
        data={getDataForField(data, 'positiveIncrease')}
        fill={positiveColor}
        {...props}
      />
      <BarChart
        data={getDataForField(data, 'deathIncrease')}
        fill={deathsBarColor}
        {...props}
      />
    </div>
  )
}
