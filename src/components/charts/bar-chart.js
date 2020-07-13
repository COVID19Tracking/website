import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types' // ES6

import { extent, max } from 'd3-array'
import { scaleBand, scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import { timeMonth, timeDay } from 'd3-time'

import { formatDate, formatNumber } from '~utilities/visualization'

import Tooltip from './tooltip'
import chartStyles from './charts.module.scss'
import styles from './bar-chart.module.scss'

import colors from '~scss/colors.module.scss'

const BarChart = ({
  data,
  lineData,
  refLineData,
  annotations,
  fill,
  lineColor,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  showTicks,
  width,
  height,
  yMax,
  yTicks,
  lastXTick,
  renderTooltipContents,
}) => {
  const [tooltip, setTooltip] = useState(null)
  // Used for tooltip optimization
  const [timeoutRef, setTimeoutRef] = useState(null)

  // Used when placing annotations
  const getValueForDate = date => {
    const dateData = data.find(d => d.date.getTime() === date.getTime())
    return dateData && dateData.value
  }
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

  const lastTime = xScaleTime.ticks(timeDay.every(1)).pop()

  let lineFn = null
  if (lineData) {
    lineFn = line()
      .defined(d => !Number.isNaN(d.value) && d.value !== null)
      .curve(curveCardinal)
      .x(d => xScaleTime(d.date))
      .y(d => yScale(d.value))
  }
  const hover = (event, d) => {
    // Ensure that tooltip doesn't flash when transitioning between bars
    if (timeoutRef) {
      clearTimeout(timeoutRef)
    }
    const isTouchEvent = !event.clientX
    const eventX = isTouchEvent ? event.touches[0].clientX : event.clientX
    const eventY = isTouchEvent ? event.touches[0].clientY : event.clientY
    setTooltip({
      top: isTouchEvent ? eventY - 130 : eventY + 10,
      left: isTouchEvent ? eventX - 80 : eventX + 5,
      d,
    })
  }
  const mouseOut = () => {
    if (timeoutRef) {
      clearTimeout(timeoutRef)
    }
    setTimeoutRef(setTimeout(() => setTooltip(null), 200))
  }
  return (
    <>
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
          {xScaleTime.ticks(xTickAmount).map(d => (
            <Fragment key={`x-${d}`}>
              <text
                className={`${chartStyles.label} ${chartStyles.xTickLabel}`}
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
          ))}
          {lastXTick && (
            <>
              <text
                className={`${chartStyles.label} ${chartStyles.xTickLabel}`}
                x={xScaleTime(lastTime)}
                y="20"
              >{`${formatDate(lastTime)}`}</text>
              <line
                className={chartStyles.label}
                stroke={colors.colorSlate500}
                x1={xScaleTime(lastTime)}
                y1="0"
                x2={xScaleTime(lastTime)}
                y2="5"
              />
            </>
          )}
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
        {/* annotations */}
        {annotations && (
          <g transform={`translate(0 ${marginTop})`}>
            {annotations.map(d => (
              <text
                key={d}
                className={`${chartStyles.annotation}`}
                x={xScaleTime(d.date)}
                y={yScale(getValueForDate(d.date))}
              >
                {d.annotationNumber}
              </text>
            ))}
          </g>
        )}
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
              className={renderTooltipContents && styles.interactiveBar}
              onMouseOver={event => hover(event, d)}
              onFocus={event => hover(event, d)}
              onMouseOut={mouseOut}
              onBlur={mouseOut}
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
      {renderTooltipContents && tooltip && (
        <Tooltip {...tooltip}>{renderTooltipContents(tooltip.d)} </Tooltip>
      )}
    </>
  )
}

BarChart.defaultProps = {
  lineData: null,
  lineColor: 'black',
  refLineData: null,
  annotations: [],
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  width: 300,
  height: 300,
  yMax: null,
  yTicks: 4,
  showTicks: 4,
  renderTooltipContents: null,
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  lineData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  refLineData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number,
    }),
  ),
  fill: PropTypes.string.isRequired,
  lineColor: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  showTicks: PropTypes.number,
  yMax: PropTypes.number,
  yTicks: PropTypes.number,
  renderTooltipContents: PropTypes.func,
}
export default BarChart
