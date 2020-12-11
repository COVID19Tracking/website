import React from 'react'
import classnames from 'classnames'
import mapStyle from './us-map.module.scss'

const piSix = Math.PI / 6
const coxSix = Math.cos(piSix)
const sinSix = Math.sin(piSix)

const State = ({ x, y, r, state, onClick, className }) => {
  const padding = r / 8
  const hexPoints = [
    [x, y - r + padding],
    [x + coxSix * r - padding, y - sinSix * r],
    [x + coxSix * r - padding, y + sinSix * r],
    [x, y + r - padding],
    [x - coxSix * r + padding, y + sinSix * r],
    [x - coxSix * r + padding, y - sinSix * r],
  ]
  const hexIndicatorPoints = [
    [x + coxSix * r - padding, y - sinSix * r + r / 1.5],
    [x + coxSix * r - padding, y + sinSix * r],
    [x, y + r - padding],
    [x - coxSix * r + padding, y + sinSix * r],
    [x - coxSix * r + padding, y - sinSix * r + r / 1.5],
  ]
  return (
    <g>
      <polygon
        points={hexPoints.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{ filter: 'url(#dropshadow)' }}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      />
      <polygon
        points={hexIndicatorPoints.map(item => item.join(',')).join(' ')}
        className={classnames(mapStyle.stateIndicator, className(state.value))}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      />
      <text
        x={x}
        y={y - r / 2.5}
        className={mapStyle.stateName}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        {state.state}
      </text>

      <text
        x={x}
        y={y}
        className={mapStyle.stateNumber}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        {Math.round(state.value).toLocaleString()}
      </text>

      <text
        x={x}
        y={y + r / 1.6}
        className={mapStyle.stateDirection}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      >
        {state.direction === 'up' ? (
          <>
            ▲<span className="a11y-only">Moving up</span>
          </>
        ) : (
          <>
            ▼<span className="a11y-only">Moving down</span>
          </>
        )}
      </text>
    </g>
  )
}

const US = ({ r, onClick }) => {
  const x = r
  const y = r
  const hexPoints = [
    [x, y - r],
    [x + coxSix * r, y - sinSix * r],
    [x + coxSix * r, y + sinSix * r],
    [x, y + r],
    [x - coxSix * r, y + sinSix * r],
    [x - coxSix * r, y - sinSix * r],
  ]
  const hexIndicatorPoints = [
    [x + coxSix * r, y - sinSix * r + r / 1.5],
    [x + coxSix * r, y + sinSix * r],
    [x, y + r],
    [x - coxSix * r, y + sinSix * r],
    [x - coxSix * r, y - sinSix * r + r / 1.5],
  ]
  return (
    <g>
      <polygon
        points={hexPoints.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{ filter: 'url(#dropshadow)' }}
        onClick={() => onClick()}
      />
      <polygon
        points={hexIndicatorPoints.map(item => item.join(',')).join(' ')}
        className={mapStyle.stateIndicator}
        onClick={() => onClick()}
      />
      <text
        x={x}
        width={r * 2}
        y={y - r / 2}
        className={mapStyle.stateName}
        onClick={() => onClick()}
      >
        US Total
      </text>

      <text
        x={x}
        y={y}
        className={mapStyle.stateNumber}
        onClick={() => onClick()}
      >
        [TK]
      </text>
    </g>
  )
}

export { State, US }
