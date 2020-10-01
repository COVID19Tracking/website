import React from 'react'
import { LineChart, XAxis, YAxis, Line, CartesianGrid } from 'recharts'
import colors from '~scss/colors.module.scss'

const LongTermCareBarChart = ({ data }) => {
  const chartData = data.map(item => ({
    date: item.date,
    deaths:
      item.deathres_other +
      item.deathres_nh +
      item.deathres_ltc +
      item.deathres_alf,
    cases:
      item.posres_other + item.posres_nh + item.posres_ltc + item.posres_alf,
  }))

  return (
    <LineChart width={500} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid
        vertical={false}
        stroke={colors.slate700}
        strokeDasharray="5 5"
      />
      <Line type="monotone" dataKey="deaths" stroke={colors.colorPlum500} />
      <Line type="monotone" dataKey="cases" stroke={colors.colorHoney500} />
    </LineChart>
  )
}

export default LongTermCareBarChart
