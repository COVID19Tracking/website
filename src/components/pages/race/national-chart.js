import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import nationalChartStyle from './national-chart.module.scss'

const DonutChart = ({ value, children }) => (
  <div className={nationalChartStyle.donutChart}>
    <div
      className={nationalChartStyle.slice}
      style={{ transform: `rotate(${value * 360 + 90}deg)` }}
    />
    <div
      className={nationalChartStyle.slice}
      style={{ transform: 'rotate(-90deg)' }}
    />
    <div className={nationalChartStyle.center}>
      <span>{children}</span>
    </div>
  </div>
)

export default () => {
  const data = useStaticQuery(graphql`
    query {
      covidRaceDataHomepage {
        blackPercentOfPopulation
        blackPercentOfDeath
      }
    }
  `)
  const {
    blackPercentOfPopulation,
    blackPercentOfDeath,
  } = data.covidRaceDataHomepage
  return (
    <div className={nationalChartStyle.wrapper}>
      <h3 className={nationalChartStyle.header}>Black people account for:</h3>
      <div className={nationalChartStyle.charts}>
        <div className={nationalChartStyle.chart}>
          <DonutChart value={blackPercentOfPopulation}>
            {Math.round(blackPercentOfPopulation * 100)}%
          </DonutChart>
          <p>of the US population</p>
        </div>
        <div className={nationalChartStyle.chart}>
          <DonutChart value={blackPercentOfDeath}>
            {Math.round(blackPercentOfDeath * 100)}%
          </DonutChart>
          <p>of deaths where race is known</p>
        </div>
      </div>
    </div>
  )
}
