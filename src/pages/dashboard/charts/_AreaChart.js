import { extent, max } from 'd3-array'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { area } from 'd3-shape'
import React from 'react'
import { formatDate } from '../utils'

export default function AreaChart({
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

  return (
    <svg
      style={{
        border: '1px solid black',
      }}
      height={height}
      width={width}
    >
      <g
        className="axis-group"
        transform={`translate(${marginLeft} ${marginTop})`}
      >
        <g
          className="axis x-axis"
          transform={`translate(0 ${height - totalYMargin})`}
        >
          {xScale.ticks(xTicks).map(tick => (
            <text key={tick} x={xScale(tick)} y={20}>
              {formatDate(tick)}
            </text>
          ))}
        </g>
        <g className="chart-grid">
          {yScale.ticks(yTicks).map(tick => (
            <g key={tick}>
              <text y={yScale(tick) + 6} x={`${tick}`.length * -11}>
                {tick}
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
        className="chart-area-group"
        transform={`translate(${marginLeft} ${marginTop})`}
      >
        {sorted.map(d => (
          <path key={d.key} d={a(d.values)} opacity={0.8} fill={fillFn(d)} />
        ))}
      </g>
    </svg>
  )
}
