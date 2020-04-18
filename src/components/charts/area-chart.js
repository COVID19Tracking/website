import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { extent, max } from 'd3-array'
import { nest } from 'd3-collection'
import { scaleLinear, scaleTime } from 'd3-scale'
import { area } from 'd3-shape'

import merge from 'lodash/merge'

import Tooltip from './tooltip'

import { formatDate, formatNumber } from '../../utilities/visualization'
import chartStyles from './charts.module.scss'

const AreaChart = ({
  annotations,
  data,
  fill,
  height,
  labelOrder,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  xTicks,
  width,
  yFormat,
  yMax,
  yTicks,
  showTicks,
  dateExtent,
  tooltipFormatter,
}) => {
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

  const domain = dateExtent || extent(data, d => d.date)
  const valueMax = max(data, d => d.value)

  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const fillFn = typeof fill === 'string' ? fill : d => fill(d.key)
  const xScale = scaleTime()
    .domain(domain)
    .range([0, width - totalXMargin])
  const yScale = scaleLinear()
    .domain([0, yMax || valueMax])
    .range([height - totalYMargin, 0])

  const a = area()
    .x(d => xScale(d.date))
    .y0(d => yScale(d.value))
    .y1(height - totalYMargin)

  const [tooltip, setTooltip] = useState(null)
  function svgPoint(svg, x, y) {
    const pt = svg.createSVGPoint()
    pt.x = x
    pt.y = y
    return pt.matrixTransform(svg.getScreenCTM().inverse())
  }
  const handlePointerMove = event => {
    if (!tooltipFormatter) return
    const eventX = event.clientX ? event.clientX : event.touches[0].clientX
    const eventY = event.clientY ? event.clientY : event.touches[0].clientY
    const result = svgPoint(event.currentTarget, eventX, eventY)
    const date = xScale.invert(result.x - marginLeft)
    date.setHours(0, 0, 0)
    setTooltip({
      x: eventX,
      y: eventY,
      date,
    })
  }
  const handlePointerLeave = () => setTooltip(null)
  const dateMap = useMemo(
    () =>
      merge(
        ...data.map(d => ({
          [d.date]: {
            date: d.date,
            [d.label]: d.value,
          },
        })),
      ),
    [data],
  )
  return (
    <>
      <svg
        className={chartStyles.chart}
        viewBox={`0 0 ${width} ${height}`}
        onTouchStart={handlePointerMove}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {showTicks ? (
          <g transform={`translate(${marginLeft} ${marginTop})`}>
            <g transform={`translate(0 ${height - totalYMargin})`}>
              {xScale.ticks(xTicks).map(tick => (
                <text
                  className={`${chartStyles.label} ${chartStyles.xTickLabel}`}
                  key={tick}
                  x={xScale(tick)}
                  y={20}
                  textAnchor="center"
                >
                  {formatDate(tick)}
                </text>
              ))}
            </g>
            <g>
              {yScale.ticks(yTicks).map(tick => (
                <g key={tick}>
                  <svg
                    y={yScale(tick) + 4}
                    x="-10"
                    className={chartStyles.yTickLabel}
                  >
                    <text className={chartStyles.label} textAnchor="end">
                      {yFormat ? yFormat(tick) : formatNumber(tick)}
                    </text>
                  </svg>
                  <line
                    className={chartStyles.gridLine}
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
            className={chartStyles.gridLine}
            x1={0}
            x2={width}
            y1={height - 1}
            y2={height - 1}
          />
        )}
        <g transform={`translate(${marginLeft} ${marginTop})`}>
          {sorted.map(d => (
            <path key={d.key} d={a(d.values)} opacity={0.8} fill={fillFn(d)} />
          ))}
        </g>
        {annotations && (
          <g transform={`translate(${marginLeft} ${marginTop})`}>
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
      {tooltip && tooltipFormatter && dateMap[tooltip.date] && (
        <Tooltip x={tooltip.x + 5} y={tooltip.y + 10}>
          {tooltipFormatter(dateMap[tooltip.date])}
        </Tooltip>
      )}
    </>
  )
}

AreaChart.defaultProps = {
  annotations: null,
  labelOrder: null,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  xTicks: 5,
  yMax: null,
  yTicks: 4,
  yFormat: null,
  showTicks: true,
  dateExtent: null,
  tooltipFormatter: null,
}

AreaChart.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.instanceOf(Date).isRequired),
  ), // ??
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    }),
  ).isRequired,
  fill: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  labelOrder: PropTypes.arrayOf(PropTypes.string),
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  xTicks: PropTypes.number,
  yMax: PropTypes.number,
  yTicks: PropTypes.number,
  yFormat: PropTypes.func,
  showTicks: PropTypes.bool,
  dateExtent: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  tooltipFormatter: PropTypes.func,
}
export default AreaChart
