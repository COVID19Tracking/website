import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalHospitalization = () => {
  const data = useStaticQuery(graphql`
    {
      allCovidUsDaily(
        filter: { date: { gt: "2020-03-11" } }
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          date
          hospitalizedCurrently
        }
      }
    }
  `)
  return (
    <Row>
      <Col width={[4, 6, 8]}>
        <Chart
          data={data.allCovidUsDaily.nodes}
          field="hospitalizedCurrently"
          fill={colors.colorBlueberry200}
          lineColor={colors.colorBlueberry400}
        />
      </Col>
      <Col width={[4, 6, 8]} />
    </Row>
  )
}

export default CarouselChartNationalHospitalization
