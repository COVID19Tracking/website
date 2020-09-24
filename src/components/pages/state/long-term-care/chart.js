import React from 'react'
import { Row, Col } from '~components/common/grid'
import colors from '~scss/colors.module.scss'
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
        <h3>Total deaths</h3>
        <BarChart
          data={deathData}
          height={280}
          width={300}
          marginBottom={20}
          marginLeft={40}
          marginRight={40}
          marginTop={10}
          fill={colors.colorPlum500}
        />
      </Col>
      <Col width={[4, 6, 6]}>
        <h3>Total cases</h3>
        <BarChart
          data={caseData}
          height={280}
          width={300}
          marginBottom={20}
          marginLeft={40}
          marginRight={40}
          marginTop={10}
          fill={colors.colorHoney500}
        />
      </Col>
    </Row>
  )
}

export default LongTermCareBarChart
