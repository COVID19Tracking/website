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
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  tickFormat,
  spaceBetween = 0,
} = {}) {
  const x = scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginLeft, width - marginRight])
  const formatTick = format(tickFormat)
  const rectangles = color
    .range()
    .map((d, i) => (
      <rect
        key={`rect${d}`}
        x={x(i - 1)}
        y={marginTop}
        width={x(i) - x(i - 1) - spaceBetween}
        height={height - marginTop - marginBottom}
        fill={d}
      />
    ))
  const ticks = (
    <g width="100%" y={0} height="20" fontSize="11" textAnchor="middle">
      {color.domain().map((tick, i) => (
        <g className="tick" transform={`translate(${x(i)})`}>
          <text fill="currentColor" y={36}>
            {formatTick(tick)}
          </text>
        </g>
      ))}
    </g>
  )
  return (
    <>
      <h5 style={{ marginBottom: 0 }}>per million residents</h5>
      <svg
        width={width}
        height={height}
        viewBox={[0, 0, width, height]}
        style={{ overflow: 'visible', display: 'block' }}
      >
        {rectangles}
        {ticks}
      </svg>
    </>
  )
}
