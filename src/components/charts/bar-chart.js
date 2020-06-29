import React, { Fragment } from 'react'
import PropTypes from 'prop-types' // ES6

import { extent, max } from 'd3-array'
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import { timeMonth } from 'd3-time'

import { formatDate, formatNumber } from '~utilities/visualization'
import chartStyles from './charts.module.scss'

import colors from '~scss/colors.module.scss'

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
  const dateDomain = extent(data, d => d.date)
  // Should probably refactor to use a single x-axis scale
  // but the bars make use of the band.
  const xScaleTime = scaleTime()
    .domain(dateDomain)
    .range([marginLeft, width - marginRight])

  const yScale = scaleLinear()
    .domain([0, yMax || max([...data, ...(refLineData || [])], d => d.value)])
    .nice()
    .range([height - totalYMargin, 0])

  const xTickAmount = timeMonth.every(1)

  let lineFn = null
  if (lineData) {
    lineFn = line()
      .curve(curveCardinal)
      .x(d => xScaleTime(d.date))
      .y(d => yScale(d.value))
  }
  return (
    <div style={{ width, height }}>
      <svg
        className={chartStyles.chart}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
      >
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
          {xScaleTime.ticks(xTickAmount).map(d => {
            return (
              <Fragment key={`x-${d}`}>
                <text
                  className={chartStyles.label}
                  key={d}
                  x={xScaleTime(d)}
                  y="20"
                >{`${formatDate(d)}`}</text>
                <line
                  className={chartStyles.label}
                  stroke={colors.colorSlate500}
                  x1={xScaleTime(d)}
                  y1="0"
                  x2={xScaleTime(d)}
                  y2="5"
                />
              </Fragment>
            )
          })}
        </g>
        <mask id="dataMask">
          <rect
            x="0"
            y="0"
            width={width - marginRight}
            height={height - totalYMargin}
            fill="white"
          />
        </mask>
        {/* data */}
        <g transform={`translate(0 ${marginTop})`} mask="url(#dataMask)">
          {/* bars (data) */}
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
          {/* line */}
          {lineData && (
            <path
              d={lineFn(lineData)}
              stroke={lineColor}
              strokeWidth="3"
              fill="none"
            />
          )}
          {/* reference line */}
          {refLineData && (
            <path
              d={lineFn(refLineData)}
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4"
              fill="none"
            />
          )}
        </g>
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
  yMax: PropTypes.number,
  yTicks: PropTypes.number,
}
export default BarChart
