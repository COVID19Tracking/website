import React from 'react'

import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { format } from 'd3-format'

import chartStyles from './charts.module.scss'

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
    .range([0, width - totalXMargin])

  return (
    <svg className={chartStyles.chart} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(${marginLeft} ${marginTop})`}>
        {xScale.ticks(xTicks).map(tick => (
          <g key={tick}>
            <text
              className={`${chartStyles.label} ${chartStyles.xTickLabel}`}
              x={xScale(tick)}
              y={height - marginBottom}
            >
              {formatTick(tick)}
            </text>
            <line
              className={chartStyles.gridLine}
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={0}
              y2={height - totalYMargin}
            />
          </g>
        ))}
      </g>

      <g transform={`translate(0, ${marginTop})`}>
        {data.map(d => (
          /* Do not remove nested svg. See https://github.com/COVID19Tracking/website/pull/645#discussion_r411676987 */
          <svg
            y={yScale(d.name) + 20}
            x={marginLeft - 10}
            className={chartStyles.yTickLabel}
            key={d.name}
          >
            <text className={chartStyles.label} textAnchor="end">
              {`${d.name}`}
            </text>
          </svg>
        ))}
      </g>

      <g transform={`translate(${marginLeft}, ${marginTop})`}>
        {data.map(d => (
          <rect
            key={d.name}
            x={0}
            y={yScale(d.name)}
            height={yScale.bandwidth()}
            width={xScale(d.value)}
            fill={fill}
          />
        ))}
      </g>
    </svg>
  )
}
