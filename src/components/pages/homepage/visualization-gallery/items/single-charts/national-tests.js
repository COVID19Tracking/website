import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import colors from '~scss/colors.module.scss'
import Chart from './chart'

const CarouselChartNationalTests = ({ item }) => {
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
    <Chart
      data={data.allCovidUsDaily.nodes}
      field="totalTestResultsIncrease"
      fill={colors.colorPlum200}
      lineColor={colors.colorPlum700}
      title="New national tests"
      relatedPost={item.relatedPost}
    />
  )
}

export default CarouselChartNationalTests
