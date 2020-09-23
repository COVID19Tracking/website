import React from 'react'

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'

const LongTermCareBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={500}>
    <ComposedChart
      data={data.map(item => ({
        ...item,
        resident_deaths:
          item.deathres_other +
          item.deathres_nh +
          item.deathres_ltc +
          item.deathres_alf,
      }))}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="resident_deaths" label="Resident deaths" fill="#000000" />
    </ComposedChart>
  </ResponsiveContainer>
)

export default LongTermCareBarChart
