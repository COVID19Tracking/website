/*eslint-disable */
import React, { useRef, useState } from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { Col, Row } from '~components/common/grid'
import { desktopGrid, mobileGrid } from './state-matrix'
import mapStyle from './us-map.module.scss'
import { FormatNumber } from '~components/utils/format'

const pi_six = Math.PI / 6
const cos_six = Math.cos(pi_six)
const sin_six = Math.sin(pi_six)

const MapNumber = ({ number, label }) => (
  <div className={mapStyle.number}>
    <h3 className="a11y-only">{label}</h3>
    <FormatNumber number={number} />
    <p aria-hidden className={mapStyle.label}>
      {label}
    </p>
  </div>
)

const State = ({ x, y, r, state, onClick }) => {
  const padding = r / 8
  const hex_points = [
    [x, y - r + padding],
    [x + cos_six * r - padding, y - sin_six * r],
    [x + cos_six * r - padding, y + sin_six * r],
    [x, y + r - padding],
    [x - cos_six * r + padding, y + sin_six * r],
    [x - cos_six * r + padding, y - sin_six * r],
  ]
  const hex_indicator_points = [
    [x + cos_six * r - padding, y - sin_six * r + r / 1.5],
    [x + cos_six * r - padding, y + sin_six * r],
    [x, y + r - padding],
    [x - cos_six * r + padding, y + sin_six * r],
    [x - cos_six * r + padding, y - sin_six * r + r / 1.5],
  ]
  return (
    <g>
      <polygon
        points={hex_points.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{ filter: 'url(#dropshadow)' }}
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
      />
      <polygon
        points={hex_indicator_points.map(item => item.join(',')).join(' ')}
        className={mapStyle.stateIndicator}
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
    </g>
  )
}

const US = ({ r, onClick }) => {
  const x = 150
  const y = 150
  const hex_points = [
    [x, y - r],
    [x + cos_six * r, y - sin_six * r],
    [x + cos_six * r, y + sin_six * r],
    [x, y + r],
    [x - cos_six * r, y + sin_six * r],
    [x - cos_six * r, y - sin_six * r],
  ]
  const hex_indicator_points = [
    [x + cos_six * r, y - sin_six * r + r / 1.5],
    [x + cos_six * r, y + sin_six * r],
    [x, y + r],
    [x - cos_six * r, y + sin_six * r],
    [x - cos_six * r, y - sin_six * r + r / 1.5],
  ]
  return (
    <g>
      <polygon
        points={hex_points.map(item => item.join(',')).join(' ')}
        className={mapStyle.state}
        style={{ filter: 'url(#dropshadow)' }}
        onClick={() => onClick()}
      />
      <polygon
        points={hex_indicator_points.map(item => item.join(',')).join(' ')}
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

const Map = ({ states, us }) => {
  const [activeState, setActiveState] = useState(false)
  const mapRef = useRef()
  const hex_di = 100
  const hex_rad = hex_di / 2
  const hex_apo = hex_rad * Math.cos(Math.PI / 6)
  const rows = desktopGrid.length
  const cols = desktopGrid[0].length
  const stroke = 4
  const scale = 2
  const x = (hex_rad * scale) / 2 + stroke * scale
  let y = hex_rad * scale + stroke * scale
  const side = Math.sin(Math.PI / 6) * hex_rad
  const height =
    (hex_di - side) * rows + side + hex_rad * scale + stroke * scale
  const width = hex_apo * 2 * cols + hex_rad * scale + stroke * scale

  let offset = false
  const stateHexes = []

  for (var i = 0; i < desktopGrid.length; i++) {
    var loop_x = offset ? hex_apo * 2 : hex_apo
    var loc_x = x
    for (var s = 0; s < desktopGrid[i].length; s++) {
      var grid_plot = desktopGrid[i][s]
      if (grid_plot !== null) {
        stateHexes.push({
          x: loc_x + loop_x,
          y,
          r: hex_rad,
          state: states.find(item => item.state === grid_plot),
        })
      }
      loc_x += hex_apo * 2
    }
    // move our y plot to next row position
    y += hex_di * 0.75
    // toggle offset per row
    offset = !offset
  }
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
          <svg
            className={mapStyle.map}
            ref={mapRef}
            style={{ width: '100%', height: '100%' }}
            viewBox={`0 0 ${width} ${height}`}
            tabIndex="0"
            aria-hidden
            tabIndex="0"
            onFocus={() => {
              setActiveState(
                stateHexes.find(({ state }) => state.state === 'WA'),
              )
            }}
            onKeyDown={event => {
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
                  return
                }
              }
            }}
          >
            <filter id="dropshadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="0" dy="0" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="dropshadow-large">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dx="0" dy="0" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <US
              r={hex_rad * 1.5}
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
          <h2>Latest totals</h2>
          {activeState ? (
            <>
              <h3>{activeState.state.name}</h3>
              <MapNumber
                number={activeState.state.current.totalTestResults}
                label="Total test results"
              />
              <MapNumber
                number={activeState.state.current.positive}
                label="Cases"
              />
              <MapNumber
                number={activeState.state.current.death}
                label="Deaths"
              />
            </>
          ) : (
            <>
              <MapNumber
                number={us.current.totalTestResults}
                label="Total test results"
              />
              <MapNumber number={us.current.positive} label="Cases" />
              <MapNumber number={us.current.death} label="Deaths" />
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

const Grid = ({ states }) => {
  const hex_di = 100
  const hex_rad = hex_di / 2
  const hex_apo = hex_rad * Math.cos(Math.PI / 6)
  const rows = mobileGrid.length
  const cols = mobileGrid[0].length
  const stroke = 4
  const scale = 2
  const x = (hex_rad * scale) / 2 + stroke * scale
  let y = hex_rad * scale + stroke * scale
  const side = Math.sin(Math.PI / 6) * hex_rad
  const height =
    (hex_di - side) * rows + side + hex_rad * scale + stroke * scale
  const width = hex_apo * 2 * cols + hex_rad * scale + stroke * scale

  let offset = false
  const stateHexes = []

  for (var i = 0; i < mobileGrid.length; i++) {
    var loop_x = offset ? hex_apo * 2 : hex_apo
    var loc_x = x
    for (var s = 0; s < mobileGrid[i].length; s++) {
      var grid_plot = mobileGrid[i][s]
      if (grid_plot !== null) {
        stateHexes.push({
          x: loc_x + loop_x,
          y,
          r: hex_rad,
          state: states.find(item => item.state === grid_plot),
        })
      }
      loc_x += hex_apo * 2
    }
    // move our y plot to next row position
    y += hex_di * 0.75
    // toggle offset per row
    offset = !offset
  }
  return (
    <div>
      <svg
        className={mapStyle.grid}
        style={{ width: '100%', height: '100%' }}
        viewBox={`0 0 ${width} ${height}`}
        tabIndex="0"
      >
        <filter id="dropshadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {stateHexes.map(({ x, y, r, state }) => (
          <State
            x={x}
            y={y}
            r={r}
            state={state}
            onClick={() => {
              navigate(`/data/state/${state.childSlug.slug}`)
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const TestMap = ({ configuration, item }) => {
  const { metric } = configuration
  const data = useStaticQuery(graphql`
    {
      allCovidStateInfo {
        nodes {
          name
          state
          childSlug {
            slug
          }
        }
      }
      allCovidUsDaily(sort: { fields: date, order: DESC }) {
        nodes {
          positiveIncrease
          negativeIncrease
          childPopulation {
            population
            positive {
              per100k
            }
          }
        }
      }
      allCovidState {
        nodes {
          totalTestResults
          positive
          death
          state
        }
      }
      covidUs {
        totalTestResults
        positive
        death
      }
      allCovidStateDaily(sort: { fields: [state, date], order: [ASC, DESC] }) {
        group(field: state, limit: 7) {
          nodes {
            state
            positiveIncrease
            negativeIncrease
            childPopulation {
              population
              positive {
                per100k
              }
            }
          }
        }
      }
    }
  `)

  const getAverage = (state, value) =>
    data.allCovidStateDaily.group
      .find(group => group.nodes[0].state === state)
      .nodes.reduce((total, item) => total + value(item), 0) / 7

  const states = data.allCovidStateInfo.nodes.map(state => {
    let value = 0
    if (metric === 'casesPer100k') {
      value = getAverage(
        state.state,
        state => state.childPopulation.positive.per100k,
      )
    }
    if (metric === 'sevenDayPositive') {
      value = getAverage(state.state, state => state.positiveIncrease)
    }
    return {
      ...state,
      current: data.allCovidState.nodes.find(row => row.state === state.state),
      value,
    }
  })
  let usValue = 0
  const us = {
    current: data.covidUs,
    value: usValue,
  }

  return (
    <>
      <Map states={states} metric={metric} us={us} />
      <Grid states={states} metric={metric} us={us} />
    </>
  )
}

export default TestMap
