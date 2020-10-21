import React, { Fragment } from 'react'

import { extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line, curveCardinal } from 'd3-shape'
import { timeMonth, timeDay } from 'd3-time'

import { formatDate, formatNumber } from '~utilities/visualization'

import chartStyles from './charts.module.scss'

import colors from '~scss/colors.module.scss'

const LineChart = ({
  data,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop = 0,
  showTicks,
  width,
  height,
  yMax,
  yTicks,
  lastXTick,
  perCapLabel,
}) => {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom

  const dates = []
  const values = []
  data.forEach(item => {
    item.data.forEach(row => {
      dates.push(row.date)
      values.push(row.value)
    })
  })

  const dateDomain = extent(dates)

  const xScaleTime = scaleTime()
    .domain(dateDomain)
    .range([marginLeft, width - marginRight])

  const yMaxEffective = yMax || max(values)

  const yScale = scaleLinear()
    .domain([0, yMaxEffective])
    .nice()
    .range([height - totalYMargin, 0])

  const msInOneMonth = 2628000000
  const monthlyTickInterval = Math.ceil(
    Math.abs((dateDomain[1] - dateDomain[0]) / (msInOneMonth * 6)),
  )

  const xTickAmount = timeMonth.every(monthlyTickInterval)

  const yTicksThreshold = 4
  const yTicksEffective =
    yTicks || yMaxEffective < yTicksThreshold ? yMaxEffective : yTicksThreshold

  const lastTime = xScaleTime.ticks(timeDay.every(1)).pop()

  const lineFn = line()
    .defined(d => !Number.isNaN(d.value) && d.value !== null)
    .curve(curveCardinal)
    .x(d => xScaleTime(d.date))
    .y(d => yScale(d.value))

  return (
    <>
      <svg
        className={chartStyles.chart}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
      >
        {/* y ticks */}
        <g transform={`translate(${marginLeft} ${marginTop})`}>
          {yScale.ticks(yTicksEffective).map(
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
                      {tick > 0 &&
                        perCapLabel /* this only displays if passed */}
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

        {/* data */}
        <g transform={`translate(0 ${marginTop})`} mask="url(#dataMask)">
          {data && (
            <>
              {data.map(dataLine => (
                <path
                  d={lineFn(dataLine.data)}
                  stroke={dataLine.color}
                  strokeWidth={dataLine.stroke}
                  fill="none"
                />
              ))}
            </>
          )}
        </g>
      </svg>
    </>
  )
}

export default LineChart
