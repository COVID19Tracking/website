/* eslint-disable prefer-destructuring */
import React, { useRef, useState } from 'react'
import { navigate } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import { State, US, Legend } from './states'
import Sidebar from './sidebar'
import createGrid from './create-grid'
import { desktopGrid } from './state-matrix'
import mapStyle from './us-map.module.scss'

const MapLegend = ({ legend }) => {
  const hexRadius = 15
  return (
    <ul className={mapStyle.legend}>
      {legend.map(item => (
        <li>
          <svg
            className={mapStyle.legendHex}
            viewBox={`0 0 ${hexRadius * 2 + 10} ${hexRadius * 2 + 10}`}
            tabIndex="0"
            aria-hidden
          >
            <Legend r={hexRadius} className={item.style} />
          </svg>
          {item.label}
        </li>
      ))}
    </ul>
  )
}

const Map = ({ states, us, relatedPost, metric, lastUpdate }) => {
  const [activeState, setActiveState] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)
  const mapRef = useRef()

  const { stateHexes, width, height, hexRad } = createGrid(states, desktopGrid)

  const setStateNeighbor = direction => {
    const move = {
      n: (x, y) => [x, y - 1],
      s: (x, y) => [x, y + 1],
      e: (x, y) => [x + 1, y],
      w: (x, y) => [x - 1, y],
    }
    desktopGrid.forEach((row, stateY) => {
      const stateX = row.indexOf(activeState.state.state)
      if (stateX === -1) {
        return
      }
      const cursor = [stateX, stateY]
      const moveState = () => {
        const movedCursor = move[direction](cursor[0], cursor[1])
        if (
          typeof desktopGrid[movedCursor[1]] === 'undefined' ||
          typeof desktopGrid[movedCursor[1]][movedCursor[0]] === 'undefined'
        ) {
          return
        }
        if (desktopGrid[movedCursor[1]][movedCursor[0]]) {
          setActiveState(
            stateHexes.find(
              ({ state }) =>
                state.state === desktopGrid[movedCursor[1]][movedCursor[0]],
            ),
          )
          return
        }
        cursor[0] = movedCursor[0]
        cursor[1] = movedCursor[1]
        moveState()
      }
      moveState()
    })
  }
  return (
    <div>
      <Row>
        <Col width={[4, 6, 9]}>
          <div className={mapStyle.mapLabel}>
            <h2>{metric.title}</h2>
            <p>
              Data updated {lastUpdate}
              {hasKeyboardFocus && (
                <span className={mapStyle.keyboard}>
                  Use the <strong>arrow keys</strong> to move between states,
                  and <strong>Escape</strong> to leave the map.
                </span>
              )}
            </p>
          </div>
          <svg
            className={mapStyle.map}
            ref={mapRef}
            style={{ width: '100%' }}
            viewBox={`-10 -60 ${width} ${height + 50}`}
            tabIndex="0"
            aria-hidden
            onBlur={() => {
              setHasKeyboardFocus(false)
            }}
            onKeyDown={event => {
              setHasKeyboardFocus(true)
              if (!activeState) {
                setActiveState(
                  stateHexes.find(({ state }) => state.state === 'WA'),
                )
                return
              }
              event.preventDefault()
              if (event.key === 'Escape') {
                mapRef.current.blur()
              }
              if (event.key === 'Tab' || event.key === 'ArrowRight') {
                setStateNeighbor('e')
              }
              if (
                (event.shiftKey && event.key === 'Tab') ||
                event.key === 'ArrowLeft'
              ) {
                setStateNeighbor('w')
              }
              if (event.key === 'ArrowDown') {
                setStateNeighbor('s')
              }
              if (event.key === 'ArrowUp') {
                setStateNeighbor('n')
              }
              if (event.key === 'Enter') {
                if (activeState === false) {
                  navigate(`/data/state/${activeState.childSlug.slug}`)
                }
              }
            }}
          >
            <US
              r={hexRad * 1.5}
              value={us.value}
              className={value => metric.getColor(value)}
              onClick={() => {
                setActiveState(false)
              }}
            />
            {stateHexes.map(({ x, y, r, state }) => (
              <State
                x={x}
                y={y}
                r={r}
                state={state}
                onClick={() => {
                  setActiveState({ x, y, r, state })
                }}
                className={value => metric.getColor(value)}
              />
            ))}
            {activeState && (
              <State
                x={activeState.x}
                y={activeState.y}
                r={activeState.r * 1.5}
                state={activeState.state}
                isActive
                className={value => metric.getColor(value)}
                onClick={() => {
                  setActiveState(false)
                }}
              />
            )}
          </svg>
          <MapLegend legend={metric.legend} />
        </Col>
        <Col width={[4, 6, 3]}>
          <Sidebar
            state={activeState}
            us={us.current}
            relatedPost={relatedPost}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Map
