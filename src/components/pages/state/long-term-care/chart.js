import React from 'react'
import { Row, Col } from '~components/common/grid'
import BarChart from '~components/charts/bar-chart'

const LongTermCareBarChart = ({ data }) => {
  const deathData = data.map(item => ({
    date: item.date,
    value:
      item.deathres_other +
      item.deathres_nh +
      item.deathres_ltc +
      item.deathres_alf,
  }))

  const caseData = data.map(item => ({
    date: item.date,
    value:
      item.posres_other + item.posres_nh + item.posres_ltc + item.posres_alf,
  }))

  return (
    <Row>
      <Col width={[4, 6, 6]}>
        <BarChart
          data={deathData}
          height={280}
          width={300}
          marginBottom={20}
          marginTop={10}
          fill="#aaa"
        />
      </Col>
      <Col width={[4, 6, 6]}>
        <BarChart
          data={caseData}
          height={280}
          width={300}
          marginBottom={20}
          marginTop={10}
          fill="#aaa"
        />
      </Col>
    </Row>
  )
}

export default LongTermCareBarChart
