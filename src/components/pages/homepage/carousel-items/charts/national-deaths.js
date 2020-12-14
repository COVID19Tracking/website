import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalDeaths = () => {
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily(
        filter: { date: { gt: "2020-03-11" } }
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          date
          deathIncrease
        }
      }
    }
  `)
  return (
    <Row>
      <Col width={[4, 6, 8]}>
        <Chart
          data={data.allCovidUsDaily.nodes}
          field="deathIncrease"
          fill={colors.colorSlate300}
          lineColor={colors.colorSlate700}
        />
      </Col>
      <Col width={[4, 6, 8]} />
    </Row>
  )
}

export default CarouselChartNationalDeaths
