import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalDeaths = ({ item }) => {
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
    <Chart
      data={data.allCovidUsDaily.nodes}
      field="deathIncrease"
      fill={colors.colorSlate300}
      lineColor={colors.colorSlate700}
      title="New national deaths"
      relatedPost={item.relatedPost}
    />
  )
}

export default CarouselChartNationalDeaths
