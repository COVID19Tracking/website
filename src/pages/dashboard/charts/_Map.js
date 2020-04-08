import React, { useState, useMemo } from 'react'

import { format } from 'd3-format'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { max } from 'd3-array'
import { scaleSqrt, scaleThreshold } from 'd3-scale'
import { schemeGreys, schemePurples } from 'd3-scale-chromatic'

import { formatNumber, formatDate, parseDate } from '../_utils'
import StatesWithPopulation from '../data/_state-populations'

import './map.scss'

import ChoroLegend from './_ChoroLegend'

// static d3 setup
const margin = {
  bottom: 10,
  left: 10,
  right: 10,
  top: 10,
}
const height = 400
const width = 700
const projection = geoAlbersUsa().fitExtent(
  [
    [margin.left, margin.top],
    [width - margin.right, height - margin.bottom],
  ],
  StatesWithPopulation,
)
const path = geoPath().projection(projection)

// this should be dynamic, espcially with the numbers only growing each day.
// for now there is just a scale for each of the fields.

/*
const limit = [
  1,
  5,
  10,
  25,
  50,
  100,
  250,
  500,
  1000,
  2500,
  5000,
  10000,
  25000,
  50000,
]
*/

const colorLimits = {
  death: [1, 5, 10, 25, 50, 100, 250],
  positive: [100, 250, 500, 1000, 2500, 5000, 10000],
  totalTestResults: [250, 500, 1000, 2500, 5000, 10000, 25000],
}

const customSchemeOranges = [
  '#fcf9eb',
  '#fbe8a9',
  '#f6ce7a',
  '#f3b05d',
  '#e2894e',
  '#c66b3e',
  '#924f34',
  '#753c2d',
]

/*
const mapColorScale = [
  '#E5A968',
  '#ED9C42',
  '#DC8C3A',
  '#CA7B32',
  '#B96A2A',
  '#A75922',
  '#96491A',
  '#843812',
]
*/

const getColor = {
  death: scaleThreshold(colorLimits.death, schemeGreys[8]),
  positive: scaleThreshold(colorLimits.positive, customSchemeOranges),
  totalTestResults: scaleThreshold(
    colorLimits.totalTestResults,
    schemePurples[8],
  ),
}

// should be imported from constants file
const colors = {
  totalTestResults: '#696DC2',
  positive: '#E5A968',
  death: '#404856',
}

export default function Map({ data, currentField, getValue, useChoropleth }) {
  const [hoveredState, setHoveredState] = useState(null)
  const maxValue = useMemo(
    () =>
      data &&
      max(
        data.features
          .map(d => Object.values(d.properties.dailyData))
          .flat()
          .map(d => d.totalTestResults),
      ),
    [data],
  )
  const r = useMemo(
    () =>
      maxValue &&
      scaleSqrt()
        .domain([0, maxValue])
        .range([0, 50]),
    [maxValue],
  )

  return (
    <div className="map-container">
      <div className="map-legend">
        {useChoropleth ? (
          <ChoroLegend
            color={getColor[currentField]}
            height={40}
            width={300}
            marginTop={8}
            tickFormat="~s"
            spaceBetween={2}
            tickSize={0}
          />
        ) : (
          <BubbleLegend data={data} r={r} maxValue={maxValue} />
        )}
      </div>

      <div className="map-contents">
        <svg width={width} height={height}>
          <>
            {!useChoropleth && (
              <Bubbles geoJson={data} getValue={getValue} r={r} />
            )}
            <States
              geoJson={data}
              useChoropleth={useChoropleth}
              currentField={currentField}
              getValue={getValue}
              setHoveredState={setHoveredState}
            />
          </>
        </svg>
        {hoveredState && (
          <Tooltip hoveredState={hoveredState} getValue={getValue} />
        )}
      </div>
    </div>
  )
}

const States = ({
  geoJson,
  useChoropleth,
  currentField,
  setHoveredState,
  getValue,
}) => {
  // below function should use getValue
  const getColorFromFeature = d => {
    if (!useChoropleth) return 'transparent'
    const value = getValue(d) ? getValue(d) : 0 // account for undefined values
    const normalizationPopulation = 1000000 // 1 million;
    const normalizedValue =
      value / (d.properties.population / normalizationPopulation)
    return getColor[currentField](normalizedValue)
  }
  const states = geoJson.features.map(d => (
    <path
      key={`path${d.properties.NAME}`}
      d={path(d)}
      className="countries"
      fill={getColorFromFeature(d)}
      stroke="#ababab"
      onMouseEnter={() => {
        setHoveredState({
          coordinates: [
            d.properties.centroidCoordinates[0],
            d.properties.centroidCoordinates[1],
          ],
          state: d,
        })
      }}
      onMouseLeave={() => setHoveredState(null)}
    />
  ))
  return <g>{states}</g>
}

const Bubbles = ({ geoJson, r, getValue }) => {
  // filter out "states" outside of render area (should be hoisted)
  const features = geoJson.features.filter(
    d => d.properties.centroidCoordinates[0],
  )

  const createBubble = (d, i, property) => {
    const props = {
      cx: d.properties.centroidCoordinates[0],
      cy: d.properties.centroidCoordinates[1],
      r: r(getValue(d, property)),
    }
    return (
      <circle
        key={property + i}
        {...props}
        fill={colors[property]}
        stroke={colors[property]}
        fillOpacity={property === 'positive' ? 0.8 : 0.2}
      />
    )
  }
  const testBubbles = features.map((d, i) =>
    createBubble(d, i, 'totalTestResults'),
  )
  const positiveBubbles = features.map((d, i) => createBubble(d, i, 'positive'))
  return (
    <>
      <g id="testBubbles">{testBubbles}</g>
      <g id="positiveBubble">{positiveBubbles}</g>
    </>
  )
}

const BubbleLegend = ({ r, maxValue }) => {
  const formatLegendEntry = d => parseInt(format('.1r')(d), 10)
  const legendData = [
    formatLegendEntry(maxValue * 0.1),
    formatLegendEntry(maxValue * 0.5),
    formatLegendEntry(maxValue),
  ]
  const legendBubbles = legendData.map(d => (
    <circle
      key={`legendBubbles${d}`}
      cx={52}
      cy={145 - r(d)}
      r={r(d)}
      stroke="#ababab"
      fill="none"
    />
  ))
  const legendLines = legendData.map(d => (
    <line
      key={`legendLines${d}`}
      x1={52}
      y1={145 - 2 * r(d)}
      x2={130}
      y2={145 - 2 * r(d)}
      stroke="#ababab"
      strokeDasharray="5 5"
    />
  ))
  const legendText = legendData.map(d => (
    <text key={`legendText${d}`} x={110} y={140 - 2 * r(d)}>
      {formatNumber(d)}
    </text>
  ))
  return (
    <svg width={150} height={150} style={{ overflow: 'visible' }}>
      {legendBubbles}
      {legendLines}
      {legendText}
    </svg>
  )
}

const Tooltip = ({ hoveredState, currentDate, getValue }) => {
  const { coordinates, state } = hoveredState
  const d = state
  const [x, y] = coordinates
  const positive = getValue(d, 'positive')
  const positiveNorm = getValue(d, 'positive', true)
  const totalTestResults = getValue(d, 'totalTestResults')
  const totalTestResultsNorm = getValue(d, 'totalTestResults', true)
  const death = getValue(d, 'death')
  const deathNorm = getValue(d, 'death', true)
  return (
    <div id="map-tooltip" style={{ top: y, left: x }}>
      <table>
        <caption>
          {d.properties.NAME}
          <br />
          <span className="date">{formatDate(parseDate(currentDate))}</span>
        </caption>
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Total</th>
            <th scope="col">Per capita*</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              <span
                style={{
                  display: 'inline',
                  borderBottom: `2px solid ${colors.totalTestResults}`,
                }}
              >
                Tests
              </span>
            </th>
            <td>{formatNumber(totalTestResults)}</td>
            <td>{formatNumber(totalTestResultsNorm)}</td>
          </tr>
          <tr>
            <th scope="col">
              <span
                style={{
                  display: 'inline',
                  borderBottom: `2px solid ${colors.positive}`,
                }}
              >
                Positive tests
              </span>
            </th>
            <td>{formatNumber(positive)}</td>
            <td>{formatNumber(positiveNorm)}</td>
          </tr>
          <tr>
            <th scope="col">
              <span
                style={{
                  display: 'inline',
                  borderBottom: `2px solid ${colors.death}`,
                }}
              >
                Deaths
              </span>
            </th>
            <td>{formatNumber(death)}</td>
            <td>{formatNumber(deathNorm)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export { path }
