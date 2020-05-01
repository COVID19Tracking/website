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
      allCdcDaily {
        nodes {
          dateCollected
          dailyTotal
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
  data.allCdcDaily.nodes.forEach(total => {
    cdcTotal += parseInt(total.dailyTotal, 10)
  })
  return (
    <Container>
      <div className={`hero ${heroStyle.hero}`}>
        <h2>
          The CDC has reported {cdcTotal.toLocaleString()} COVID-19 tests in the
          US to date. We&apos;ve counted{' '}
          {data.allCovidUs.nodes[0].posNeg.toLocaleString()}
        </h2>
        <p>
          Complete testing data from the entire United States is crucial for
          newsrooms, public health departments, and the public—but no government
          source is collecting it. We are.
        </p>
        <Chart data={data} />
        <p>CDC number vs our number</p>
      </div>
    </Container>
  )
}
