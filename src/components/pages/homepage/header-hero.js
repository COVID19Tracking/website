import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { DateTime } from 'luxon'
import heroStyle from './header-hero.module.scss'
import colors from '~scss/colors.module.scss'
import containerStyle from '~components/common/container.module.scss'
import homepageContainerStyle from './container.module.scss'

const Chart = ({ data, isMobile }) => {
  const width = 1140
  const height = 700
  const labelOffset = isMobile ? 320 : 120
  const bottomLabelOffset = isMobile ? 50 : 25
  const barWidth = isMobile ? 10 : 5
  const fontSize = isMobile ? 40 : 15
  const cdcList = {}
  const cdc = []
  const ctp = []

  let maxDate = 0
  data.allCdcDaily.nodes.forEach(node => {
    const date = DateTime.fromFormat(
      `${node.dateCollected}/2020`,
      'D',
    ).toFormat('yyyyMMdd')
    if (date && node.dailyTotal) {
      cdcList[date] = node
      maxDate = parseInt(date, 10) > maxDate ? parseInt(date, 10) : maxDate
    }
  })

  data.allCovidUsDaily.nodes.forEach(node => {
    if (node.date > maxDate || node.date < 20200226) {
      return
    }
    ctp.push({
      date: node.date,
      value: node.totalTestResultsIncrease,
    })
    if (typeof cdcList[node.date] !== 'undefined') {
      cdc.push({
        date: node.date,
        value: cdcList[node.date].dailyTotal,
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
  return (
    <svg
      viewBox={`0 0 ${width + labelOffset} ${height + bottomLabelOffset}`}
      style={{ paddingBottom: bottomLabelOffset }}
    >
      <g transform={`translate(0 0 ${labelOffset} ${bottomLabelOffset})`}>
        {ctp.map(d => (
          <rect
            key={d.date + d.value}
            className={heroStyle.chartBar}
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
            className={heroStyle.chartBar}
            x={xScale(d.date)}
            y={yScale(d.value)}
            height={yScale(0) - yScale(d.value)}
            width={barWidth}
            fill="white"
          />
        ))}
      </g>
      <g transform="translate(0 0)" className={heroStyle.chartYAxis}>
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
                  <text x="0" y="0">
                    {tick === 300000 ? (
                      <>
                        <tspan x="0" dy="0">
                          {tick.toLocaleString()}
                        </tspan>
                        <tspan x="0" dy="1em">
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
      <g transform="translate(0, 0)" className={heroStyle.chartXAxis}>
        {ctp.map(d => {
          if (DateTime.fromISO(d.date).day !== 1) {
            return null
          }
          return (
            <text
              className={heroStyle.chartLegend}
              style={{ fill: 'white', fontSize }}
              x={xScale(d.date)}
              y={height + (isMobile ? 40 : 20)}
            >
              {DateTime.fromISO(d.date).toFormat('LLLL')}
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
      allCdcDaily {
        nodes {
          dailyTotal
          dateCollected
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
    <div className={`hero ${heroStyle.hero}`}>
      <div className={`${containerStyle.container} ${heroStyle.container}`}>
        <div className={`${homepageContainerStyle.container}`}>
          <h2 className={`hero-header ${heroStyle.header}`}>
            The public needs the most complete data possible about COVID-19 in
            the United States. No government source is sharing it — so we are.
          </h2>
          <p className={`hero-paragraph ${heroStyle.paragraph}`}>
            CDC numbers don&apos;t tell the full story. Their official count
            shows{' '}
            <span className={heroStyle.cdcCount}>
              {cdcTotal.toLocaleString()}
            </span>{' '}
            of tests to date across the US. Using a rigorous data-collection
            process, we&apos;ve counted{' '}
            <span className={heroStyle.ctpCount}>
              {data.allCovidUs.nodes[0].posNeg.toLocaleString()}
            </span>
            .
          </p>
        </div>
        <div className={heroStyle.chartWrapper}>
          <Chart data={data} />
        </div>
      </div>
    </div>
  )
}
