/* eslint-disable no-debugger */

import { extent, max } from 'd3-array'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { area } from 'd3-shape'
import React from 'react'

import { formatDate, formatNumber } from '../_utils'

import './area-chart.scss'

export default function AreaChart({
  annotations = null,
  data,
  fill,
  height,
  labelOrder = false,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  xExtent,
  xTicks = 5,
  width,
  yMax = null,
  yTicks = 4,
  showTicks = true,
}) {
  const grouped = nest()
    .key(d => d.label)
    .entries(data)

  const sorted = !labelOrder
    ? grouped
    : labelOrder
        .map(label => {
          const match = grouped.find(d => d.key === label)
          return match
        })
        .filter(d => d)

  const dateExtent = xExtent || extent(data, d => d.date)
  const valueMax = max(data, d => d.value)

  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const fillFn = typeof fill === 'string' ? fill : d => fill(d.key)
  const xScale = scaleTime()
    .domain(dateExtent)
    .range([0, width - totalXMargin])
  const yScale = scaleLinear()
    .domain([0, yMax || valueMax])
    .range([height - totalYMargin, 0])

  const a = area()
    .x(d => xScale(d.date))
    .y0(d => yScale(d.value))
    .y1(height - totalYMargin)

  const strokeColor = '#b2bbbf'

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {showTicks ? (
        <g
          className="axis-group"
          transform={`translate(${marginLeft} ${marginTop})`}
        >
          <g
            className="axis x-axis"
            transform={`translate(0 ${height - totalYMargin})`}
          >
            {xScale.ticks(xTicks).map(tick => (
              <text
                className="area-chart__x-tick-label"
                key={tick}
                x={xScale(tick)}
                y={20}
              >
                {formatDate(tick)}
              </text>
            ))}
          </g>
          <g className="chart-grid">
            {yScale.ticks(yTicks).map(tick => (
              <g key={tick}>
                <svg
                  y={yScale(tick) + 4}
                  x="-10"
                  className="area-chart__y-tick-label"
                >
                  <text textAnchor="end">{formatNumber(tick)}</text>
                </svg>
                <line
                  stroke={strokeColor}
                  x1={0}
                  x2={width - totalXMargin}
                  y1={yScale(tick)}
                  y2={yScale(tick)}
                />
              </g>
            ))}
          </g>
        </g>
      ) : (
        <line
          stroke={strokeColor}
          x1={0}
          x2={width}
          y1={height - 1}
          y2={height - 1}
        />
      )}
      <g
        className="chart-area-group"
        transform={`translate(${marginLeft} ${marginTop})`}
      >
        {sorted.map(d => (
          <path key={d.key} d={a(d.values)} opacity={0.8} fill={fillFn(d)} />
        ))}
      </g>
      {annotations && (
        <g
          className="chart-annotations-group"
          transform={`translate(${marginLeft} ${marginTop})`}
        >
          {annotations.map(d => (
            <line
              key={d.date}
              stroke="black"
              strokeWidth="2px"
              x1={xScale(d.date) - 1}
              x2={xScale(d.date) - 1}
              y1="0"
              y2={height - marginTop - marginBottom}
            />
          ))}
        </g>
      )}
    </svg>
  )
}
