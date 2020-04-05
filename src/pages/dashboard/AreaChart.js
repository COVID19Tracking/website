/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react'
import { json } from 'd3-fetch'
import D3AreaChart from './charts/_AreaChart'
import { sortByDate, transformUsDaily } from './utils'
import { COLOR_MAP } from './constants'

// unless async data is shared across many components,
// each component should make their own api calls and have their own state
const AreaChart = () => {
  const [data, updateData] = useState([])

  useEffect(() => {
    async function fetchUsDailyData() {
      const usDaily = await json('https://covidtracking.com/api/us/daily')
      const sortedUsDaily = sortByDate(usDaily)
      const transformed = transformUsDaily(sortedUsDaily)
      updateData(transformed)
    }
    fetchUsDailyData()
  }, [])

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <D3AreaChart
        data={data}
        fill={d => (d === 'Total' ? COLOR_MAP.TOTAL : COLOR_MAP.POSITIVE)}
        height={400}
        labelOrder={['Total', 'Positive']}
        marginBottom={40}
        marginLeft={80}
        marginRight={10}
        marginTop={10}
        xTicks={2}
        width={400}
      />
    </>
  )
}
export default AreaChart
