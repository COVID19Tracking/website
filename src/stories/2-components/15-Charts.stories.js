import React from 'react'

import AreaChart from '../../pages/dashboard/charts/_AreaChart'
import { parseDate } from '../../pages/dashboard/_utils'

import usDaily from '../../../_data/v1/us/daily.json'

export default {
  title: 'Charts',
}

export const areaChart = () => {
  const data = usDaily
    .slice(usDaily.length - 10, usDaily.length - 1)
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
