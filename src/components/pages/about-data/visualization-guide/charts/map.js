import React, { useState, useMemo, useEffect } from 'react'

import { format } from 'd3-format'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { max, ticks } from 'd3-array'
import { nest } from 'd3-collection'
import { scaleSqrt, scaleThreshold, scaleSequential } from 'd3-scale'

import StatesWithPopulation from '~data/visualization/state-populations.json'

import { formatNumber, formatDate, parseDate } from '~utilities/visualization'
import { interpolateRgbMonotone } from '~utilities/interpolators'

import './map.scss'

import ChoroLegend from './choro-legend'

import breakpoints from '~scss/breakpoints.module.scss'
import importedColors from '~scss/colors.module.scss'

const viewportSm = parseInt(breakpoints.viewportSm, 10)

// static d3 setup
const margin = {
  bottom: 10,
  left: 10,
  right: 10,
  top: 10,
}

const schemeMap = {
  death: 'Slate',
  positive: 'Honey',
  totalTestResults: 'Plum',
}

const makeContinuous = (scheme, domain) => {
  const baseColors = new Array(8)
    .fill(0)
    .map((_, i) => importedColors[`color${scheme}${i + 1}00`])
  const interpolator = interpolateRgbMonotone(baseColors)
  return scaleSequential()
    .domain(domain)
    .interpolator(interpolator)
}

const strokeGrey = '#ababab'
const strokeWhite = '#fff'

const getStrokeColor = {
  death: strokeWhite,
  positive: strokeGrey,
  totalTestResults: strokeGrey,
}

export default function Map({
  rawStateData,
  currentField,
  currentDate,
  getValue,
  useChoropleth,
  setJoinedData,
}) {
  const [mapWidth, setMapWidth] = useState(910)
  const [mapHeight, setMapHeight] = useState(520)

  const path = useMemo(() => {
    const projection = geoAlbersUsa().fitExtent(
      [
        [margin.left, margin.top],
        [mapWidth - margin.right, mapHeight - margin.bottom],
      ],
      StatesWithPopulation,
    )
    return geoPath().projection(projection)
  }, [mapWidth, mapHeight])

  const data = useMemo(() => {
    if (!rawStateData || !path) return null

    const createMapFromArray = (array, keyField, valueField = null) => {
      return Object.assign(
        {},
        ...array.map(a => ({ [a[keyField]]: valueField ? a[valueField] : a })),
      )
    }

    const groupedByState = nest()
      .key(d => d.state)
      .entries(rawStateData)
    const stateMap = createMapFromArray(groupedByState, 'key', 'values')
    const joinedFeatures = StatesWithPopulation.features.map(feature => {
      // Calculate normalized values here instead of inside State components,
      // so that we can use them to dynamically create color scales
      const normalizationPopulation = 1000000
      const getPerCapita = d =>
        (d / feature.properties.population) * normalizationPopulation
      const state = stateMap[feature.properties.STUSPS].map(d => ({
        ...d,
        perCapita: {
          death: getPerCapita(d.death ? d.death : 0),
          positive: getPerCapita(d.positive ? d.positive : 0),
          totalTestResults: getPerCapita(
            d.totalTestResults ? d.totalTestResults : 0,
          ),
        },
      }))
      return {
        ...feature,
        properties: {
          ...feature.properties,
          centroidCoordinates: path.centroid(feature), // should get rid of turf and use d3 for the centroid
          dailyData: createMapFromArray(state, 'date'),
        },
      }
    })

    const tempData = { ...StatesWithPopulation, features: joinedFeatures }
    setJoinedData(tempData)
    return tempData
  }, [rawStateData, path])

  /* ------ CHOROPLETH COLORS ------ */

  // Maximum normalized values
  const maxPerCapita = useMemo(() => {
    if (!data) return null
    const lastDay = data.features.map(
      d => Object.values(d.properties.dailyData).slice(-1)[0].perCapita,
    )
    return {
      death: max(lastDay, d => d.death),
      positive: max(lastDay, d => d.positive),
      totalTestResults: max(lastDay, d => d.totalTestResults),
    }
  }, [data])

  const colorLimits = useMemo(
    () =>
      maxPerCapita && {
        death: ticks(0, maxPerCapita.death, 7).slice(1),
        positive: ticks(0, maxPerCapita.positive, 7).slice(1),
        totalTestResults: ticks(0, maxPerCapita.totalTestResults, 7).slice(1),
      },
    [maxPerCapita],
  )

  const color = useMemo(() => {
    if (!colorLimits || !maxPerCapita) return null
    // The number of thresholds, dynamically allocated by d3.ticks(),
    // might be greater than the number of colors available in a given,
    // discrete palette. Thus, we'll create a continuous scheme from said
    // palette, then partition it into color thresholds.
    const deathCS = makeContinuous(schemeMap.death, [0, maxPerCapita.death])
    const positiveCS = makeContinuous(schemeMap.positive, [
      0,
      maxPerCapita.positive,
    ])
    const totalTestResultsCS = makeContinuous(schemeMap.totalTestResults, [
      0,
      maxPerCapita.totalTestResults,
    ])
    return {
      death: scaleThreshold(
        colorLimits.death.slice(0, -1),
        colorLimits.death.map(d => deathCS(d)),
      ),
      positive: scaleThreshold(
        colorLimits.positive.slice(0, -1),
        colorLimits.positive.map(d => positiveCS(d)),
      ),
      totalTestResults: scaleThreshold(
        colorLimits.totalTestResults.slice(0, -1),
        colorLimits.totalTestResults.map(d => totalTestResultsCS(d)),
      ),
    }
  }, [colorLimits, maxPerCapita])

  const [hoveredState, setHoveredState] = useState(null)

  /* ------ BUBBLE SIZE ------ */
  const maxValue = useMemo(
    () =>
      data &&
      max(
        data.features
          .map(d => Object.values(d.properties.dailyData))
          .reduce((acc, val) => acc.concat(val), [])
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
  const [isMobile, setIsMobile] = useState(false)

  /* ------ TOOLTIP COLORS ------ */
  const tooltipColors = {
    death: importedColors[`color${schemeMap.death}700`],
    positive: importedColors[`color${schemeMap.positive}500`],
    totalTestResults: importedColors[`color${schemeMap.totalTestResults}600`],
  }

  useEffect(() => {
    // we could use resize listener here
    if (window.screen.availWidth < viewportSm) {
      setMapWidth(400)
      setMapHeight(300)
      setIsMobile(true)
    }
  }, [])

  return (
    <div className="map-container">
      <div
        className={['map-legend', useChoropleth ? 'choropleth' : 'bubble'].join(
          ' ',
        )}
      >
        {useChoropleth ? (
          <ChoroLegend
            color={color[currentField]}
            height={isMobile ? 180 : 36}
            width={isMobile ? 32 : 300}
            tickSize={isMobile ? 12 : 6}
            tickFormat="~s"
            spaceBetween={2}
          />
        ) : (
          <BubbleLegend
            data={data}
            r={r}
            maxValue={maxValue}
            height={isMobile ? 100 : 150}
            width={isMobile ? 100 : 150}
          />
        )}
      </div>

      <div className="map-contents">
        <svg width={mapWidth} height={mapHeight}>
          <>
            {!useChoropleth && (
              <Bubbles geoJson={data} getValue={getValue} r={r} />
            )}
            <States
              geoJson={data}
              useChoropleth={useChoropleth}
              currentField={currentField}
              currentDate={currentDate}
              getColor={color}
              hoveredState={hoveredState}
              setHoveredState={setHoveredState}
              path={path}
            />
          </>
        </svg>
        {hoveredState && (
          <Tooltip
            hoveredState={hoveredState}
            getValue={getValue}
            currentDate={currentDate}
            colors={tooltipColors}
          />
        )}
      </div>
      <p className="chart-legend-note">*Per one million people</p>
    </div>
  )
}

const States = ({
  geoJson,
  useChoropleth,
  currentField,
  currentDate,
  hoveredState,
  setHoveredState,
  getColor,
  path,
}) => {
  // Don't need to use getValue
  const getColorFromFeature = d => {
    if (!useChoropleth) return 'transparent'
    const normalizedValue = d.properties.dailyData[currentDate]
      ? d.properties.dailyData[currentDate].perCapita[currentField]
      : 0
    return getColor[currentField](normalizedValue)
  }
  const strokeColor = useChoropleth ? getStrokeColor[currentField] : strokeGrey
  const states = geoJson.features.map(d => (
    <path
      key={`path${d.properties.NAME}`}
      d={path(d)}
      className="states"
      fill={getColorFromFeature(d)}
      stroke={strokeColor}
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
  return (
    <>
      <g>{states}</g>
      {hoveredState && (
        <path
          d={path(hoveredState.state)}
          className="hovered-states"
          fill="transparent"
          stroke="#000000"
          strokeWidth="2px"
        />
      )}
    </>
  )
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
      <g className="test-bubbles">{testBubbles}</g>
      <g className="positive-bubbles">{positiveBubbles}</g>
    </>
  )
}

const BubbleLegend = ({ r, maxValue, width, height }) => {
  const formatLegendEntry = d => parseInt(format('.1r')(d), 10)
  const legendData = [
    formatLegendEntry(maxValue * 0.1),
    formatLegendEntry(maxValue * 0.5),
    formatLegendEntry(maxValue),
  ]
  const legendBubbles = legendData.map(d => (
    <circle
      key={`legendBubbles${d}`}
      cx={width / 3 + 2}
      cy={height - r(d)}
      r={r(d)}
      stroke="#ababab"
      fill="none"
    />
  ))
  const legendLines = legendData.map(d => (
    <line
      key={`legendLines${d}`}
      x1={width / 3 + 2}
      y1={height - 2 * r(d)}
      x2={width - 20}
      y2={height - 2 * r(d)}
      stroke="#ababab"
      strokeDasharray="5 5"
    />
  ))
  const legendText = legendData.map(d => (
    <text
      key={`legendText${d}`}
      x={(width * 2) / 3 + 4}
      y={height - 2 * r(d) - 2}
      fill="#ababab"
      fontSize="15px"
    >
      {formatNumber(d)}
    </text>
  ))
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {legendBubbles}
      {legendLines}
      {legendText}
    </svg>
  )
}

const Tooltip = ({ hoveredState, currentDate, getValue, colors }) => {
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
    <div className="map-tooltip" style={{ top: y, left: x }}>
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
