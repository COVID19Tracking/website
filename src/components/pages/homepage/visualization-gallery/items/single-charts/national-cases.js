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
          positiveIncrease
        }
      }
    }
  `)
  return (
    <Chart
      data={data.allCovidUsDaily.nodes}
      field="positiveIncrease"
      fill={colors.colorStrawberry100}
      lineColor={colors.colorStrawberry200}
      title="New national cases"
      relatedPost={item.relatedPost}
    />
  )
}

export default CarouselChartNationalHospitalization
