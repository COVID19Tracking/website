import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { DateTime } from 'luxon'
import Container from '../common/container'
import heroStyle from './hero.module.scss'
import chartStyles from '../charts/charts.module.scss'
import colors from '../../scss/colors.module.scss'

const Chart = ({ data }) => {
  const width = 800
  const height = 400
  const cdc = []
  const ctp = []

  const sortByDate = (a, b) => {
    if (parseInt(a, 10) > parseInt(b, 10)) {
      return 1
    }
    return -1
  }

  data.allCdcDaily.nodes.forEach(node => {
    cdc.push({
      date: DateTime.fromFormat(`${node.dateCollected}/2020`, 'D').toFormat(
        'yyyyMMdd',
      ),
      value: node.dailyTotal,
    })
  })

  data.allCovidUsDaily.nodes.forEach(node => {
    ctp.push({
      date: node.date,
      value: node.totalTestResultsIncrease,
    })
  })
  cdc.sort(sortByDate)
  ctp.sort(sortByDate)
  console.log(cdc)

  const xScale = scaleBand()
    .domain(ctp.map(d => d.date))
    .range([0, width])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, max(ctp, d => d.value)])
    .nice()
    .range([height, 0])
  return (
    <svg className={chartStyles.chart} viewBox={`0 0 ${width} ${height}`}>
      <g transform="translate(0 0)">
        {ctp.map(d => (
          <rect
            key={d.date + d.value}
            x={xScale(d.date)}
            y={yScale(d.value)}
            height={yScale(0) - yScale(d.value)}
            width={xScale.bandwidth()}
            fill={colors.colorPlum400}
          />
        ))}
      </g>
      <g transform="translate(0 0)">
        {cdc.map(d => (
          <rect
            key={d.date + d.value}
            x={xScale(d.date)}
            y={yScale(d.value)}
            height={yScale(0) - yScale(d.value)}
            width={xScale.bandwidth()}
            fill={colors.colorPlum700}
          />
        ))}
      </g>
    </svg>
  )
}

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidUsDaily {
        nodes {
          date
          totalTestResultsIncrease
        }
      }
      allCdcDaily {
        nodes {
          dateCollected
          dailyTotal
        }
      }
    }
  `)
  return (
    <Container>
      <div className={`hero ${heroStyle.hero}`}>
        <Chart data={data} />
      </div>
    </Container>
  )
}
