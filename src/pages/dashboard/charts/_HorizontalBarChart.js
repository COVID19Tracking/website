import React from 'react'

import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { format } from 'd3-format'

import { gridLinesColor } from '../_utils'

export default function HorizontalBarChart({
  data,
  fill,
  height,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  xTicks,
  width,
  xMax = null,
}) {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const yScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, height - totalYMargin])
    .padding(0.2)
  const formatTick = format('~s')
  const xScale = scaleLinear()
    .domain([120, xMax || max(data, d => d.value)])
    .nice()
    .range([width - totalXMargin, 0])

  return (
    <div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g
          className="axis-group"
          transform={`translate(${marginLeft} ${marginTop})`}
        >
          <g className="chart-grid">
            {xScale.ticks(xTicks).map(tick => (
              <g key={tick}>
                <text
                  className="axis-labels"
                  x={230 - xScale(tick)}
                  y={height - marginBottom}
                >
                  {formatTick(tick)}
                </text>
                <line
                  className="gridlines"
                  stroke={gridLinesColor}
                  x1={xScale(tick)}
                  x2={xScale(tick)}
                  y1={0}
                  y2={height - totalYMargin}
                />
              </g>
            ))}
          </g>
        </g>

        <g className="axis-group" transform={`translate(0, ${marginTop})`}>
          {data.map(d => (
            <text
              className="axis-labels"
              y={yScale(d.name) + 10}
              x={marginLeft - 10}
            >
              {`${d.name}`}
            </text>
          ))}
        </g>

        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          {data.map(d => (
            <rect
              key={d.name}
              x={0}
              y={yScale(d.name)}
              height={yScale.bandwidth()}
              width={xScale(0) - xScale(d.value)}
              fill={fill}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
