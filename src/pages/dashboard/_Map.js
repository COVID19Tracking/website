import React, { useState, useEffect, useMemo } from 'react'

import { format } from 'd3-format'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { json } from 'd3-fetch'
import { nest } from 'd3-collection'
import { scaleThreshold } from 'd3-scale'
import { schemeOranges, schemeGreys, schemePurples } from 'd3-scale-chromatic'
import { timeFormat, timeParse } from 'd3-time-format'

import { StatesWithPopulation } from './_state-populations'

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
// this should be dynamic, espcially with the toggleable fields
// for now there is just a scale for each of the fields.
const limit = [1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
const colorLimits = {
  death: [1, 2, 5, 10, 25, 50, 100],
  positive: [50, 100, 250, 500, 1000, 2500, 5000],
  totalTestResults: [100, 250, 500, 1000, 2500, 5000, 10000],
}
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

const getColor = {
  death: scaleThreshold(colorLimits.death, schemeGreys[8]),
  positive: scaleThreshold(colorLimits.positive, schemeOranges[8]),
  totalTestResults: scaleThreshold(
    colorLimits.totalTestResults,
    schemePurples[8],
  ),
}

export default function Map() {
  const formatDate = timeFormat('%b. %d')
  const formatNumber = format(',.0f')
  const parseDate = timeParse('%Y%m%d')

  const StatesJson = StatesWithPopulation

  //should be imported from constants file
  const colors = {
    totalTestResults: '#696DC2',
    positive: '#E5A968',
    death: '#404856',
  }
  const getValue = (d, field = currentField, normalized = false) =>
    ((d.properties.dailyData[currentDate] &&
      d.properties.dailyData[currentDate][field]) ||
      0) / (normalized ? d.properties.population / 1000000 : 1)

  // holds the date of the displayed day
  const [currentDate, setCurrentDate] = useState('')
  // holds the field we are currently viewing
  const [currentField, setCurrentField] = useState('positive')

  const [useChoropleth, setUseChoropleth] = useState(true)

  const margin = {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
  }
  const height = 400
  const width = 700
  const [rawStateData, setRawStateData] = useState(null)

  const joinedData = useMemo(() => {
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
    const joinedFeatures = StatesJson.features.map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        centroidCoordinates: path.centroid(feature), //should get rid of turf and use d3 for the centroid
        dailyData: createMapFromArray(
          stateMap[feature.properties.STUSPS],
          'date',
        ),
      },
    }))
    return { ...StatesJson, features: joinedFeatures }
  }, [rawStateData])
  // holds all data in geojson objects TODO: convert to useMemo? - won't be necessary once we're using gatsby data
  useEffect(() => {
    const fetchData = async () => {
      const stateData = await json('https://covidtracking.com/api/states/daily')
      setRawStateData(stateData)
      setCurrentDate(stateData[0].date)
      const groupedByDate = nest()
        .key(function(d) {
          return d.date
        })
        .entries(stateData)
        .reverse()
      /*
      slider
        .attr('min', 0)
        .attr('max', groupedByDate.length - 1)
        .attr('step', 1)
        */
    }
    fetchData()
  }, [])
  return (
    <div className="test">
      Test
      {joinedData && (
        <States
          geoJson={joinedData}
          useChoropleth={useChoropleth}
          currentDate={currentDate}
          currentField={currentField}
        />
      )}
    </div>
  )
}

const States = ({ geoJson, useChoropleth, currentDate, currentField }) => {
  const getColorFromFeature = d => {
    if (!useChoropleth) return 'white'
    const normalizationPopulation = 1000000 // 1 million;

    const normalizedValue = d.properties.dailyData[currentDate]
      ? d.properties.dailyData[currentDate][currentField] /
        (d.properties.population / normalizationPopulation)
      : 0
    return getColor[currentField](normalizedValue)
  }
  const states = geoJson.features.map((d, i) => (
    <path
      key={'path' + i}
      d={path(d)}
      className="countries"
      fill={getColorFromFeature(d)}
      stroke="#ababab"
    />
  ))
  return (
    <svg width={700} height={500}>
      {states}
    </svg>
  )
}
