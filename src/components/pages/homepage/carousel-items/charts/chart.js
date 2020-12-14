import React from 'react'
import { DateTime } from 'luxon'
import BarChart from '~components/charts/bar-chart'
import { Col, Row } from '~components/common/grid'

const Chart = ({ data, field, fill, lineColor }) => {
  const daily = data
    .map(item => ({
      date: DateTime.fromISO(item.date).toJSDate(),
      value: item[field],
    }))
    .sort((a, b) => (a.date > b.date ? 1 : -1))
  const dailyAverage = []
  daily.forEach(({ date }, key) => {
    if (key >= daily.length - 7) {
      return
    }
    let average = 0
    for (let i = 0; i < 7; i += 1) {
      average += daily[key + i].value
    }
    dailyAverage.push({
      date,
      value: average / 7,
    })
  })
  daily.splice(-7, 7)
  return (
    <Row>
      <Col width={[4, 6, 8]}>
        <BarChart
          data={daily}
          lineData={dailyAverage}
          fill={fill}
          lineColor={lineColor}
          height={450}
          width={900}
          marginBottom={40}
          marginLeft={60}
          marginRight={30}
          marginTop={10}
          xTicks={3}
          showTicks={6}
          lastXTick
        />
      </Col>
      <Col width={[4, 6, 8]} />
    </Row>
  )
}

export default Chart
