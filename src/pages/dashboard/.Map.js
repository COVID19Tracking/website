import React, { useState, useMemo, useEffect } from 'react'

import { json } from 'd3-fetch'
import { nest } from 'd3-collection'
import { sum } from 'd3-array'

import _Map from './charts/_Map'
import { path } from './charts/_Map'
import StatesWithPopulation from './data/_state-populations'

import { formatDate, formatNumber } from './.utils'

import './.Map.scss'

const Map = () => {
  // holds the date of the displayed day
  const [currentDate, setCurrentDate] = useState('20200401')
  // holds the field we are currently viewing
  const [currentField, setCurrentField] = useState('positive')

  const [useChoropleth, setUseChoropleth] = useState(false)

  const [rawStateData, setRawStateData] = useState(null)

  const getValue = useMemo(
    () => (d, field = currentField, normalized = false) =>
      ((d.properties.dailyData[currentDate] &&
        d.properties.dailyData[currentDate][field]) ||
        0) / (normalized ? d.properties.population / 1000000 : 1),
    [currentDate, currentField],
  )

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
    const joinedFeatures = StatesWithPopulation.features.map(feature => ({
      ...feature,
      properties: {
        ...feature.properties,
        centroidCoordinates: path.centroid(feature), // should get rid of turf and use d3 for the centroid
        dailyData: createMapFromArray(
          stateMap[feature.properties.STUSPS],
          'date',
        ),
      },
    }))
    return { ...StatesWithPopulation, features: joinedFeatures }
  }, [rawStateData])

  const sumTotalTestResults = useMemo(
    () =>
      joinedData &&
      sum(joinedData.features, d => getValue(d, 'totalTestResults')),
    [joinedData, currentDate],
  )
  const sumPositive = useMemo(
    () => joinedData && sum(joinedData.features, d => getValue(d, 'positive')),
    [joinedData, currentDate],
  )

  const sumChoro = useMemo(
    () => joinedData && sum(joinedData.features, d => getValue(d)),
    [joinedData, getValue],
  )

  useEffect(() => {
    const fetchData = async () => {
      const stateData = await json('https://covidtracking.com/api/states/daily')
      setRawStateData(stateData)
      setCurrentDate(stateData[0].date)
      /*
      const groupedByDate = nest()
        .key(function(d) {
          return d.date
        })
        .entries(stateData)
        .reverse()
        */
    }
    fetchData()
  }, [])

  const propertyOptions = [
    {
      value: 'positive',
      name: 'Positive Cases',
    },
    {
      value: 'totalTestResults',
      name: 'Total Tests',
    },
    {
      value: 'death',
      name: 'Deaths',
    },
  ]

  return (
    <div id="state-map">
      <div
        id="map-style-button"
        onClick={() => setUseChoropleth(!useChoropleth)}
      >
        <span className={useChoropleth ? '' : 'active'}>Bubble Map</span>
        <span className={useChoropleth ? 'active' : ''}>Choropleth</span>
      </div>
      <div id="map-dek">
        <h2>{formatDate(currentDate)}</h2>
        {useChoropleth ? (
          <div>
            <span>{formatNumber(sumChoro)}</span>{' '}
            <select
              value={currentField}
              onChange={e => setCurrentField(e.target.value)}
            >
              {propertyOptions.map(({ value, name }) => (
                <option value={value}>{name}</option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <span>{formatNumber(sumTotalTestResults)}</span>{' '}
              <span className="legend-text total">tests conducted</span>
            </div>
            <div>
              <span>{formatNumber(sumPositive)}</span>{' '}
              <span className="legend-text positive">positive tests</span>
            </div>
          </>
        )}
      </div>
      <div id="map-time-scrubber"></div>
      <_Map
        data={joinedData}
        getValue={getValue}
        currentDate={currentDate}
        currentField={currentField}
        useChoropleth={useChoropleth}
      />
    </div>
  )
}

export default Map
