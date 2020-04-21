/* eslint-disable react/destructuring-assignment import/no-unresolved */
import React from 'react'

import AreaChart from '../../components/charts/area-chart'
import BarChart from '../../components/charts/bar-chart'

import { parseDate } from '../../utilities/visualization'

import usDaily from '../../../_data/v1/us/daily.json'

export default {
  title: 'Charts',
}

export const areaChart = () => {
  const data = usDaily
    .slice(0, 10)
    .map(node => [
      {
        date: parseDate(node.date),
        label: 'Total',
        value: node.totalTestResults,
      },
      { date: parseDate(node.date), label: 'Positive', value: node.positive },
    ])
    .reduce((acc, val) => acc.concat(val), [])
  const fill = d => {
    if (d === 'Total') return '#585BC1'
    return '#FFA270'
  }
  const props = {
    data,
    fill, // can also be a function
    height: 200,
    width: 300,
    marginBottom: 40,
    marginLeft: 80,
    marginRight: 10,
    marginTop: 10,
    xTicks: 2,
  }
  return (
    <div style={{ width: props.width, height: props.height }}>
      <AreaChart {...props} />
    </div>
  )
}
const sortChronologically = (a, b) => {
  if (a.date > b.date) return 1
  if (a.date < b.date) return -1
  return 0
}

export const barChart = () => {
  const data = usDaily
    .slice(0, 20)
    .map(({ date, totalTestResultsIncrease }) => {
      return {
        date: parseDate(date),
        value: +totalTestResultsIncrease,
      }
    })
    .sort(sortChronologically)
  return (
    <BarChart
      data={data}
      fill="#585BC1"
      height={200}
      marginBottom={40}
      marginLeft={80}
      marginRight={10}
      marginTop={10}
      xTicks={2}
      width={400}
    />
  )
}
