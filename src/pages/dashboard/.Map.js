import React, { useState, useMemo, useEffect } from 'react'

import { json } from 'd3-fetch'
import { nest } from 'd3-collection'

import _Map from './charts/_Map'
import { path } from './charts/_Map'
import StatesWithPopulation from './data/_state-populations'

import './.Map.scss'

const Map = () => {
  // holds the date of the displayed day
  const [currentDate, setCurrentDate] = useState('20200401')
  // holds the field we are currently viewing
  const [currentField /* setCurrentField */] = useState('positive')

  const [useChoropleth, setUseChoropleth] = useState(false)

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
  return (
    <>
      <div
        id="map-style-button"
        onClick={() => setUseChoropleth(!useChoropleth)}
      >
        <span className={useChoropleth ? '' : 'active'}>Bubble Map</span>
        <span className={useChoropleth ? 'active' : ''}>Choropleth</span>
      </div>
      <_Map
        data={joinedData}
        currentDate={currentDate}
        currentField={currentField}
        useChoropleth={useChoropleth}
      />
    </>
  )
}

export default Map
