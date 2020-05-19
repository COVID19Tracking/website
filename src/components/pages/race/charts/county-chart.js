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
  const labelOffset = 130
  const heightOffset = 30

  const yScale = scaleBand()
    .domain(data.map((d, index) => index))
    .range([0, height])

  const xScale = scaleLinear()
    .domain([0, max(data, d => d[field])])
    .nice()
    .range([0, width])
  return (
    <svg
      className={countyChartStyles.chart}
      viewBox={`0 0 ${width + labelOffset} ${height + heightOffset}`}
    >
      <g
        transform={`translate(${labelOffset} ${heightOffset})`}
        height={height - heightOffset}
        width={width - labelOffset}
      >
        {data.map((d, index) => (
          <rect
            key={`${field}-${d.name}-${d.state}`}
            x={0}
            y={yScale(index)}
            height={10}
            width={xScale(d[field])}
            className={`${countyChartStyles.bar} ${
              countyChartStyles[groupClasses[d.demographics.largestRace1]]
            }`}
            fill="#000"
          />
        ))}
      </g>
      <g transform="translate(0, 15)">
        {xScale.ticks(3).map(
          (tick, i) =>
            i < 3 && (
              <g key={`${field}-${tick}`}>
                <svg
                  y={0}
                  x={xScale(tick) + labelOffset}
                  width={labelOffset}
                  className={countyChartStyles.tick}
                >
                  <text className={countyChartStyles.label}>
                    {tick.toLocaleString()}
                  </text>
                </svg>
              </g>
            ),
        )}
      </g>
      <g transform={`translate(0, ${heightOffset})`}>
        {data.map((d, index) => (
          <g key={`${d.field}-${d.county}`}>
            <svg
              y={yScale(index) + 10}
              x={0}
              width={labelOffset}
              className={countyChartStyles.tick}
            >
              <text className={countyChartStyles.label}>
                {d.name}, {d.demographics.abbreviation}
              </text>
            </svg>
          </g>
        ))}
      </g>
    </svg>
  )
}
