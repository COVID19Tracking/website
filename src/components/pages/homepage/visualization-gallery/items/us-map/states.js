import React, { useContext } from 'react'
import classnames from 'classnames'
import { MetricContext } from './drop-shadow'
import mapStyle from './us-map.module.scss'

const piSix = Math.PI / 6
const coxSix = Math.cos(piSix)
const sinSix = Math.sin(piSix)

const Legend = ({ r, className }) => {
  const x = r + 5
  const y = r + 5
  const padding = 0
  const hexPoints = [
    [x, y - r + padding],
    [x + coxSix * r - padding, y - sinSix * r],
    [x + coxSix * r - padding, y + sinSix * r],
    [x, y + r - padding],
    [x - coxSix * r + padding, y + sinSix * r],
    [x - coxSix * r + padding, y - sinSix * r],
  ]
  return (
    <g>
      <polygon
        points={hexPoints.map(item => item.join(',')).join(' ')}
        className={classnames(mapStyle.stateIndicator, className)}
      />
    </g>
  )
}

const State = ({ x, y, r, state, onClick, className, isActive }) => {
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
  const { metric, format } = useContext(MetricContext)
  return (
    <g>
      <polygon
        points={hexPoints.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{
          filter: isActive
            ? `url(#dropshadow-large-${metric})`
            : `url(#dropshadow-${metric})`,
        }}
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
        {format(state.value)}
      </text>
    </g>
  )
}

const US = ({ r, value, onClick, className, inGrid, isActive }) => {
  const x = r
  const y = inGrid ? r + 5 : r - r / 2
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
  const { metric, format } = useContext(MetricContext)
  return (
    <g>
      <polygon
        points={hexPoints.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{
          filter: isActive
            ? `url(#dropshadow-large-${metric})`
            : `url(#dropshadow-${metric})`,
        }}
        onClick={() => onClick()}
      />
      <polygon
        points={hexIndicatorPoints.map(item => item.join(',')).join(' ')}
        className={classnames(mapStyle.stateIndicator, className(value))}
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
        {format(value)}
      </text>
    </g>
  )
}

export { State, US, Legend }
