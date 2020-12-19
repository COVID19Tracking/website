import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalHospitalization = ({ item }) => {
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
    <Chart
      data={data.allCovidUsDaily.nodes}
      field="hospitalizedCurrently"
      fill={colors.colorBlueberry200}
      lineColor={colors.colorBlueberry400}
      title="Current national hospitalization"
      relatedPost={item.relatedPost}
    />
  )
}

export default CarouselChartNationalHospitalization
