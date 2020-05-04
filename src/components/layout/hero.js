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
  const width = 1140
  const height = 500
  const cdc = []
  const ctp = []

  const sortByDate = (a, b) => {
    if (parseInt(a, 10) > parseInt(b, 10)) {
      return 1
    }
    return -1
  }

  let maxDate = 0
  data.allCovidCdcTests.nodes.forEach(node => {
    const date = DateTime.fromFormat(`${node.date}`, 'D').toFormat('yyyyMMdd')
    cdc.push({
      date,
      value: node.total,
    })
    maxDate = parseInt(date, 10) > maxDate ? parseInt(date, 10) : maxDate
  })

  data.allCovidUsDaily.nodes.forEach(node => {
    if (node.date > maxDate) {
      return
    }
    ctp.push({
      date: node.date,
      value: node.totalTestResultsIncrease,
    })
  })
  cdc.sort(sortByDate)
  ctp.sort(sortByDate)

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
            fill="#3b4590"
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
      allCovidCdcTests {
        nodes {
          total
          date
        }
      }
      allCovidUs {
        nodes {
          posNeg
        }
      }
    }
  `)
  let cdcTotal = 0
  data.allCovidCdcTests.nodes.forEach(total => {
    cdcTotal += parseInt(total.total, 10)
  })
  return (
    <Container>
      <div className={`hero ${heroStyle.hero}`}>
        <div className={heroStyle.text}>
          <h2 className={`hero-header ${heroStyle.header}`}>
            The CDC has reported {cdcTotal.toLocaleString()} COVID-19 tests in
            the US to date. We&apos;ve counted{' '}
            {data.allCovidUs.nodes[0].posNeg.toLocaleString()}
          </h2>
          <p>
            Complete testing data from the entire United States is crucial for
            newsrooms, public health departments, and the public—but no
            government source is collecting it. We are.
          </p>
        </div>
        <Chart data={data} />
        <p className={heroStyle.chartDetail}>CDC number vs our number</p>
      </div>
    </Container>
  )
}
