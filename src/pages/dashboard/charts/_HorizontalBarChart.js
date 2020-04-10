/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

import { extent, max, range } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import React, { useEffect } from 'react'

import { formatNumber } from '../_utils'

export default function HorizontalBarChart({
  data,
  fill,
  height,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  xTicks = 5,
  width,
  yMax = null,
  yTicks = 4,
}) {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const xScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width - totalXMargin])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, yMax || max(data, d => d.value)])
    .nice()
    .range([height - totalYMargin, 0])

  const xScaleDomain = xScale.domain()
  const ticks = range(
    0,
    xScaleDomain.length,
    Math.floor(xScaleDomain.length / xTicks),
  )
  return (
    <div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g
          className="axis-group"
          transform={`translate(${marginLeft} ${marginTop})`}
        >
          <g className="chart-grid">
            {yScale.ticks(yTicks).map(tick => (
              <g key={tick}>
                <text y={yScale(tick) + 6} x={`${tick}`.length * -11}>
                  {formatNumber(tick)}
                </text>
                <line
                  stroke="black"
                  x1={0}
                  x2={width - totalXMargin}
                  y1={yScale(tick)}
                  y2={yScale(tick)}
                />
              </g>
            ))}
          </g>
        </g>

        <g
          className="axis-group"
          transform={`translate(${marginLeft},${height - marginBottom})`}
        >
          {ticks.map(d => {
            const name = xScale.domain()[d]
            return <text x={xScale(name)} y="18">{`${name}`}</text>
          })}
        </g>

        <g transform={`translate(${marginLeft} ${marginTop})`}>
          {data.map(d => (
            <rect
              key={d.name}
              x={xScale(d.name)}
              y={yScale(d.value)}
              height={yScale(0) - yScale(d.value)}
              width={xScale.bandwidth()}
              fill={fill}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
