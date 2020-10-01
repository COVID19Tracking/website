import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from 'recharts'
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
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={500} height={300} data={chartData} anim>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid
          vertical={false}
          stroke={colors.slate700}
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dot={false}
          animationDuration={0}
          dataKey="deaths"
          stroke={colors.colorPlum500}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dot={false}
          animationDuration={0}
          dataKey="cases"
          stroke={colors.colorHoney500}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LongTermCareBarChart
