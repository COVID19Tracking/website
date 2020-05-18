import React from 'react'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import countyChartStyles from './county-chart.module.scss'

const groupClasses = {
  'White alone': 'whiteAlone',
  'Black or African American alone': 'blackAfricanAmericanAlone',
  'Hispanic or Latino': 'hispanicLatino',
}

export default ({ data, field }) => {
  const height = 400
  const width = 400
  const labelOffset = 70

  const xScale = scaleBand()
    .domain(data.map((d, index) => index))
    .range([0, width])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, max(data, d => d[field])])
    .nice()
    .range([height, 0])
  return (
    <svg
      className={countyChartStyles.chart}
      viewBox={`0 0 ${width + labelOffset} ${height}`}
    >
      <g transform={`translate(${labelOffset},0)`}>
        {data.map((d, index) => (
          <rect
            key={`${field}-${d.name}-${d.state}`}
            x={xScale(index)}
            y={yScale(d[field])}
            className={`${countyChartStyles.bar} ${
              countyChartStyles[groupClasses[d.demographics.largestRace1]]
            }`}
            height={yScale(0) - yScale(d[field])}
            width={10}
            fill="#000"
          />
        ))}
      </g>
      <g transform="translate(0,0)">
        {yScale.ticks(3).map(tick => (
          <g key={`${field}-${tick}`}>
            <svg
              y={yScale(tick) + 15}
              width={labelOffset}
              className={countyChartStyles.tick}
            >
              <line stroke="currentColor" x2="-6" />
              <text className={countyChartStyles.label}>
                {tick.toLocaleString()}
              </text>
            </svg>
          </g>
        ))}
      </g>
    </svg>
  )
}
