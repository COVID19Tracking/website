import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { DateTime } from 'luxon'
import Container from '../common/container'
import heroStyle from './hero.module.scss'
import colors from '../../scss/colors.module.scss'

const Chart = ({ data }) => {
  const width = 1140
  const height = 700
  const labelOffset = 120
  const bottomLabelOffset = 25
  const cdcList = {}
  const cdc = []
  const ctp = []

  let maxDate = 0
  data.allCovidCdcTests.nodes.forEach(node => {
    const date = DateTime.fromFormat(`${node.date}`, 'D').toFormat('yyyyMMdd')
    if (date) {
      cdcList[date] = node
      maxDate = parseInt(date, 10) > maxDate ? parseInt(date, 10) : maxDate
    }
  })

  data.allCovidUsDaily.nodes.forEach(node => {
    if (node.date > maxDate) {
      return
    }
    ctp.push({
      date: node.date,
      value: node.totalTestResultsIncrease,
    })
    if (typeof cdcList[node.date] !== 'undefined') {
      cdc.push({
        date: node.date,
        value: cdcList[node.date].total,
      })
    }
  })

  const xScale = scaleBand()
    .domain(ctp.map(d => d.date))
    .range([0, width])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, max(ctp, d => d.value)])
    .nice()
    .range([height, 0])

  const barWidth = 5
  return (
    <svg
      viewBox={`0 0 ${width + labelOffset} ${height + bottomLabelOffset}`}
      style={{ paddingBottom: bottomLabelOffset, paddingRight: 150 }}
    >
      <g transform={`translate(0 0 ${labelOffset} ${bottomLabelOffset})`}>
        {ctp.map(d => (
          <rect
            key={d.date + d.value}
            x={xScale(d.date)}
            y={yScale(d.value)}
            height={yScale(0) - yScale(d.value)}
            width={barWidth}
            fill={colors.colorHoney400}
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
            width={barWidth}
            fill="white"
          />
        ))}
      </g>
      <g transform="translate(0 0)">
        {yScale.ticks(4).map(
          (tick, i) =>
            i !== 0 &&
            i < 4 && (
              <g key={tick}>
                <svg
                  y={yScale(tick) + 6}
                  x={width + labelOffset / 2}
                  className={heroStyle.chartLegend}
                >
                  <text style={{ fill: 'white' }} x="0" y="0">
                    {tick === 300000 ? (
                      <>
                        <tspan x="0" dy="16px">
                          {tick.toLocaleString()}
                        </tspan>
                        <tspan x="0" dy="16px">
                          {' '}
                          new tests
                        </tspan>
                      </>
                    ) : (
                      <>{tick.toLocaleString()}</>
                    )}
                  </text>
                </svg>
                <line
                  className={heroStyle.chartLine}
                  x1={0}
                  x2={width}
                  y1={yScale(tick)}
                  y2={yScale(tick)}
                />
              </g>
            ),
        )}
      </g>
      <g transform="translate(0, 0)">
        {ctp.map(d => {
          if (DateTime.fromISO(d.date).day !== 1) {
            return null
          }
          return (
            <text
              className={heroStyle.chartLegend}
              style={{ fill: 'white' }}
              x={xScale(d.date)}
              y={height + 20}
            >
              {DateTime.fromISO(d.date).toFormat('LLL')}
            </text>
          )
        })}
      </g>
    </svg>
  )
}

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidUsDaily(
        filter: { date: { gt: 20200101 } }
        sort: { fields: date }
      ) {
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
            The public needs the most complete data possible about COVID-19 in
            the United States. No government source is sharing it — so we are.
          </h2>
          <p>
            CDC numbers don&apos;t tell the full story. Their official count
            shows {cdcTotal.toLocaleString()} of tests to date across the US.
            Using a rigorous data-collection process, we&apos;ve counted{' '}
            {data.allCovidUs.nodes[0].posNeg.toLocaleString()}.
          </p>
        </div>
        <Chart data={data} />
        <p className={heroStyle.chartDetail}>CDC number vs our number</p>
      </div>
    </Container>
  )
}
