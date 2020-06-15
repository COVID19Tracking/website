import React from 'react'
import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import countyChartStyles from './county-chart.module.scss'

const groupClasses = {
  'White alone': 'whiteAlone',
  'Black or African American alone': 'blackAfricanAmericanAlone',
  'Hispanic or Latino': 'hispanicLatino',
  'Asian alone': 'asianAlone',
  'Two or more races': 'twoOrMore',
  'American Indian and Alaskan Native alone': 'aianAlone',
  'Native Hawaiian and Other Pacific Islander alone': 'nhpiAlone',
}

export default ({ data, field, label, verticalTicks }) => {
  const height = 400
  const width = 400
  const labelOffset = 150
  const heightOffset = 50

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
        <svg
          y={0}
          x={labelOffset}
          width={labelOffset}
          className={countyChartStyles.tick}
        >
          <text className={countyChartStyles.label}>{label}</text>
        </svg>
        {xScale.ticks(3).map(
          (tick, i) =>
            i < 3 && (
              <g key={`${field}-${tick}`}>
                <svg
                  y={20}
                  x={xScale(tick) + labelOffset + (i > 0 ? -20 : 0)}
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
      {xScale.ticks(verticalTicks).map((tick, i) => (
        <g key={`${field}-${tick}`}>
          <svg
            y={20}
            x={xScale(tick) + labelOffset + (i > 0 ? -20 : 0)}
            width={1}
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={height}
              className={countyChartStyles.verticalTick}
              style={{ height }}
            />
          </svg>
        </g>
      ))}
      {data.map((d, index) => (
        <g
          key={`${d.field}-${d.county}`}
          transform={`translate(0, ${heightOffset})`}
        >
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
    </svg>
  )
}
