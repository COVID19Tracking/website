/* eslint-disable prefer-destructuring */
import React, { useRef, useState } from 'react'
import { navigate } from 'gatsby'
import { Row, Col } from '~components/common/grid'
import { State, US } from './states'
import Sidebar from './sidebar'
import createGrid from './create-grid'
import { desktopGrid } from '../state-matrix'
import mapStyle from './us-map.module.scss'

const Map = ({ states, us, metric, lastUpdate }) => {
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
        <Col width={[4, 6, 10]}>
          <div className={mapStyle.mapLabel}>
            <h3>{metric.title}</h3>
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
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${width} ${height}`}
            tabIndex="0"
            aria-hidden
            onBlur={() => {
              setHasKeyboardFocus(false)
            }}
            onFocus={() => {
              setActiveState(
                stateHexes.find(({ state }) => state.state === 'WA'),
              )
            }}
            onKeyDown={event => {
              setHasKeyboardFocus(true)
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
              />
            ))}
            {activeState && (
              <State
                x={activeState.x}
                y={activeState.y}
                r={activeState.r * 1.5}
                state={activeState.state}
              />
            )}
          </svg>
        </Col>
        <Col width={[4, 6, 2]}>
          <Sidebar state={activeState} us={us.current} />
        </Col>
      </Row>
    </div>
  )
}

export default Map
