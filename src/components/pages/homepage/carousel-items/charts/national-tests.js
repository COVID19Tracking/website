import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalTests = () => {
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily(
        filter: { date: { gt: "2020-03-11" } }
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          date
          totalTestResultsIncrease
        }
      }
    }
  `)
  return (
    <Row>
      <Col width={[4, 6, 8]}>
        <Chart
          data={data.allCovidUsDaily.nodes}
          field="totalTestResultsIncrease"
          fill={colors.colorPlum200}
          lineColor={colors.colorPlum700}
        />
      </Col>
      <Col width={[4, 6, 8]} />
    </Row>
  )
}

export default CarouselChartNationalTests
