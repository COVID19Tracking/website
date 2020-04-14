/* eslint-disable no-debugger */
import React from 'react'

// import { format } from 'd3-format'
import { format } from 'd3-format'
import { scaleLinear } from 'd3-scale'

export default function ChoroLegend({
  color,
  // title,
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  tickFormat,
  spaceBetween = 0,
} = {}) {
  const isHorizontal = width > height
  const x = scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginLeft, width - marginRight])
  const y = scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginTop, height - marginBottom])
  const formatTick = format(tickFormat)

  const createRect = (d, i) => {
    const props = {
      key: `rect${d}`,
      fill: d,
    }
    if (isHorizontal) {
      return (
        <rect
          {...props}
          x={x(i - 1)}
          y={marginTop}
          width={x(i) - x(i - 1) - spaceBetween}
          height={height - marginTop - marginBottom}
        />
      )
    }
    return (
      <rect
        {...props}
        x={marginLeft + tickSize}
        y={y(i - 1)}
        width={width - marginLeft - marginRight - tickSize}
        height={y(i) - y(i - 1) - spaceBetween}
      />
    )
  }
  const rectangles = <g>{color.range().map(createRect)}</g>
  const ticks = isHorizontal ? (
    <g width="100%" y={0} height="20" fontSize="11" textAnchor="middle">
      {color.domain().map((tick, i) => (
        <g className="tick" key={tick} transform={`translate(${x(i)})`}>
          <text fill="currentColor" y={height - tickSize - 2}>
            {formatTick(tick)}
          </text>
        </g>
      ))}
    </g>
  ) : (
    <g width="100%" y={0} widths="20" fontSize="11" textAnchor="middle">
      {color.domain().map((tick, i) => (
        <g className="tick" key={tick} transform={`translate(0 ${y(i)})`}>
          <text fill="currentColor">{formatTick(tick)}</text>
        </g>
      ))}
    </g>
  )
  return (
    <svg
      width={width}
      height={height}
      viewBox={[0, 0, width, height]}
      style={{ overflow: 'visible', display: 'block' }}
    >
      {rectangles}
      {ticks}
    </svg>
  )
}
