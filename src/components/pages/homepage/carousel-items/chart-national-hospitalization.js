import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import BarChart from '~components/charts/bar-chart'
import { Col, Row } from '~components/common/grid'
import colors from '~scss/colors.module.scss'

const CarouselChartNationalHospitalization = () => {
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily(sort: { fields: date, order: DESC }, limit: 97) {
        nodes {
          date
          hospitalizedCurrently
        }
      }
    }
  `)
  const hospitalization = data.allCovidUsDaily.nodes.map(item => ({
    date: DateTime.fromISO(item.date).toJSDate(),
    value: item.hospitalizedCurrently,
  }))
  const hospitalizationAverage = []
  hospitalization.forEach(({ date }, key) => {
    if (key >= 90) {
      return
    }
    let average = 0
    for (let i = 0; i < 7; i += 1) {
      average += hospitalization[key + i].value
    }
    hospitalizationAverage.push({
      date,
      value: average / 7,
    })
  })
  return (
    <Row>
      <Col width={[4, 6, 8]}>
        <BarChart
          data={hospitalization}
          lineData={hospitalizationAverage}
          fill={colors.colorPlum200}
          lineColor={colors.colorPlum700}
          height={280}
          width={280}
          marginBottom={40}
          marginLeft={60}
          marginRight={30}
          marginTop={10}
          xTicks={3}
          showTicks={6}
          lastXTick
        />
      </Col>
    </Row>
  )
}

export default CarouselChartNationalHospitalization
