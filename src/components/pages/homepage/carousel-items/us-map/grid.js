import React from 'react'
import { navigate } from 'gatsby'
import { State, US } from './states'
import createGrid from './create-grid'
import { mobileGrid } from './state-matrix'
import mapStyle from './us-map.module.scss'

const Grid = ({ states, us, metric }) => {
  const { stateHexes, width, height, hexRad } = createGrid(
    states,
    mobileGrid,
    true,
  )
  return (
    <div className={mapStyle.gridWrapper}>
      <h3>{metric.title}</h3>
      <svg
        className={mapStyle.grid}
        style={{ width: '100%', height: '100%' }}
        viewBox={`0 -10 ${width} ${height}`}
        tabIndex="0"
        aria-hidden
      >
        <US
          r={hexRad * 1.5}
          value={us.value}
          className={value => metric.getColor(value)}
          onClick={() => {
            navigate('/data/national')
          }}
        />
        {stateHexes.map(({ x, y, r, state }) => (
          <State
            x={x}
            y={y + hexRad * 4}
            r={r}
            state={state}
            onClick={() => {
              navigate(`/data/state/${state.childSlug.slug}`)
            }}
            className={value => metric.getColor(value)}
          />
        ))}
      </svg>
    </div>
  )
}

export default Grid
