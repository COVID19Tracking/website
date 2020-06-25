import PropTypes from 'prop-types' // ES6

import { extent, max, range } from 'd3-array'
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import React from 'react'

import { formatDate, formatNumber } from '~utilities/visualization'
import chartStyles from './charts.module.scss'

const BarChart = ({
  data,
  lineData,
  refLineData,
  fill,
  lineColor,
  height,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  showTicks,
  xTicks,
  width,
  yMax,
  yTicks,
}) => {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  // The x range is over the area in which the chart should be displaying.
  // We don't use an X transform to place it in the correct spot, we use range
  // instead
  const xScale = scaleBand()
    .domain(data.map(d => d.date))
    .range([marginLeft, width - marginRight])
    .padding(0.1)

  const yScale = scaleLinear()
    .domain([0, yMax || max([...data, ...(refLineData || [])], d => d.value)])
    .nice()
    .range([height - totalYMargin, 0])

  const xScaleDomain = xScale.domain()
  const ticks = range(
    0,
    xScaleDomain.length,
    Math.floor(xScaleDomain.length / xTicks),
  )
  let lineFn = null
  if (lineData) {
    const dateDomain = extent(data, d => d.date)

    const xScaleLine = scaleTime()
      .domain(dateDomain)
      .range([marginLeft, width - marginRight])

    lineFn = line()
      .curve(curveCardinal)
      .x(d => xScaleLine(d.date))
      .y(d => yScale(d.value))
  }
  return (
    <div style={{ width, height }}>
      <svg className={chartStyles.chart} viewBox={`0 0 ${width} ${height}`}>
        {/* y ticks */}
        <g transform={`translate(${marginLeft} ${marginTop})`}>
          {yScale.ticks(yTicks).map(
            (tick, i) =>
              i < showTicks && (
                <g key={tick}>
                  {/* Do not remove nested svg. See https://github.com/COVID19Tracking/website/pull/645#discussion_r411676987 */}
                  <svg
                    y={yScale(tick) + 6}
                    x="-10"
                    className={chartStyles.yTickLabel}
                  >
                    <text className={chartStyles.label}>
                      {formatNumber(tick)}
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
              ),
          )}
        </g>
        {/* x ticks (dates) */}
        <g transform={`translate(0, ${height - marginBottom})`}>
          {ticks.map(d => {
            const date = xScale.domain()[d]
            return (
              <text
                className={`${chartStyles.label} ${chartStyles.xTickLabel}`}
                key={d}
                x={xScale(date)}
                y="25"
              >{`${formatDate(date)}`}</text>
            )
          })}
        </g>
        {/* bars (data) */}
        <g transform={`translate(0 ${marginTop})`}>
          {data.map(d => (
            <rect
              key={d.date + d.value}
              x={xScale(d.date)}
              y={yScale(d.value)}
              height={yScale(0) - yScale(d.value)}
              width={xScale.bandwidth()}
              fillOpacity={lineData ? 1 : 0.8}
              fill={fill}
            />
          ))}
        </g>
        {/* line */}
        {lineData && (
          <g transform={`translate(0 ${marginTop})`}>
            <path
              d={lineFn(lineData)}
              stroke={lineColor}
              strokeWidth="3"
              fill="none"
            />
          </g>
        )}
        {/* reference line */}
        {refLineData && (
          <g transform={`translate(0 ${marginTop})`}>
            <path
              d={lineFn(refLineData)}
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  )
}

BarChart.defaultProps = {
  lineData: null,
  refLineData: null,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  xTicks: 5,
  yMax: null,
  yTicks: 4,
  showTicks: 4,
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number,
    }),
  ).isRequired,
  lineData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number,
    }),
  ),
  refLineData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number,
    }),
  ),
  fill: PropTypes.string.isRequired,
  lineColor: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  showTicks: PropTypes.number,
  xTicks: PropTypes.number,
  yMax: PropTypes.number,
  yTicks: PropTypes.number,
}
export default BarChart
