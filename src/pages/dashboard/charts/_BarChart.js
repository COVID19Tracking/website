import PropTypes from 'prop-types' // ES6

import { max, range } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import React from 'react'

import { formatDate, formatNumber } from '../_utils'

const BarChart = ({
  data,
  fill,
  height,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  xTicks,
  width,
  yMax,
  yTicks,
}) => {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const xScale = scaleBand()
    .domain(data.map(d => d.date))
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
                <text y={yScale(tick) + 6} x={`${tick}`.length * -12}>
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
            const date = xScale.domain()[d]
            return (
              <text key={d} x={xScale(date)} y="18">{`${formatDate(
                date,
              )}`}</text>
            )
          })}
        </g>

        <g transform={`translate(${marginLeft} ${marginTop})`}>
          {data.map(d => (
            <rect
              key={d.date}
              x={xScale(d.date)}
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

BarChart.defaultProps = {
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  xTicks: 5,
  yMax: null,
  yTicks: 4,
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      value: PropTypes.number,
    }),
  ).isRequired,
  fill: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  xTicks: PropTypes.number,
  yMax: PropTypes.number,
  yTicks: PropTypes.number,
}
export default BarChart
