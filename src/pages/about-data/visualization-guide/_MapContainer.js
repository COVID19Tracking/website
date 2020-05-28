import React, { useState, useMemo, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { set } from 'd3-collection'
import { sum } from 'd3-array'

import Map from '~pages/about-data/visualization-guide/charts/_Map'

import { formatDate, formatNumber, parseDate } from '~utilities/visualization'

import '~pages/about-data/visualization-guide/map-container.scss'
import dashboardStyles from '~pages/about-data/visualization-guide/dashboard.module.scss'
import TotalAndPositiveLegend from '~pages/about-data/visualization-guide/_TotalAndPositiveLegend'

const MapContainer = () => {
  const rawStateData = useStaticQuery(graphql`
    {
      allCovidStateDaily {
        nodes {
          date
          positive
          totalTestResults
          death
          state
        }
      }
    }
  `).allCovidStateDaily.nodes

  const dates = useMemo(() =>
    set(rawStateData.map(s => s.date))
      .values()
      .reverse(),
  )
  const [sliderIndex, setSliderIndex] = useState(dates.length - 1)

  const [sliderInterval, setSliderInterval] = useState(null)

  // holds the date of the displayed day. calculated using the slider index
  const currentDate = useMemo(() => dates[sliderIndex], [dates, sliderIndex])

  // holds the field we are currently viewing
  const [currentField, setCurrentField] = useState('positive')

  const [useChoropleth, setUseChoropleth] = useState(false)

  const [playing, setPlaying] = useState(false)

  // the data is joined to the stateJson in the Map child component and
  // updated using setJoinedData.
  // this is because we need access to the d3 Path used for calculating
  // the centroid of each state
  const [joinedData, setJoinedData] = useState(null)

  const getValue = useMemo(
    () => (d, field = currentField, normalized = false) =>
      ((d.properties.dailyData[currentDate] &&
        d.properties.dailyData[currentDate][field]) ||
        0) / (normalized ? d.properties.population / 1000000 : 1),
    [currentDate, currentField],
  )

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
    () =>
      joinedData && sum(joinedData.features, d => getValue(d, currentField)),
    [joinedData, getValue],
  )
  const sumPopulation = useMemo(
    () => joinedData && sum(joinedData.features, d => d.properties.population),
    [joinedData],
  )
  const start = () => {
    if (sliderIndex === dates.length - 1) {
      setSliderIndex(0)
    }
    setSliderInterval(setInterval(() => setSliderIndex(i => i + 1), 500))
  }
  const stop = () => {
    clearInterval(sliderInterval)
    setPlaying(false)
    setSliderInterval(null)
  }
  useEffect(() => {
    if (sliderIndex === dates.length - 1) {
      stop()
    }
  }, [sliderIndex])
  useEffect(() => {
    if (playing && !sliderInterval) start()
    else stop()
  }, [playing])
  const propertyOptions = [
    {
      value: 'positive',
      name: 'positive tests',
    },
    {
      value: 'totalTestResults',
      name: 'total tests',
    },
    {
      value: 'death',
      name: 'deaths',
    },
  ]
  const togglePlaying = () => setPlaying(p => !p)

  const toggleMapStyle = () => setUseChoropleth(u => !u)

  return (
    <div className="state-map">
      <h3 className={dashboardStyles.chartTitle}>
        The Spread of COVID-19 in the US
      </h3>
      <div className="map-dek">
        <h2>{formatDate(parseDate(currentDate))}</h2>
        {useChoropleth ? (
          <div>
            <span>{formatNumber((sumChoro / sumPopulation) * 1000000)}</span>{' '}
            <select
              value={currentField}
              onChange={e => setCurrentField(e.target.value)}
            >
              {propertyOptions.map(({ value, name }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
            <div className="label">per one million people</div>
          </div>
        ) : (
          <TotalAndPositiveLegend
            total={sumTotalTestResults}
            positive={sumPositive}
          />
        )}
        <div className="map-time-scrubber">
          <div className="map-start-stop-controls">
            <div
              className={`map-start-stop ${playing ? 'stop' : 'start'}`}
              onClick={() => togglePlaying()}
              onKeyDown={() => togglePlaying()}
              role="switch"
              label={playing ? 'stop' : 'start'}
              aria-checked={playing}
              tabIndex={0}
            />
            <input
              onChange={event =>
                setSliderIndex(parseInt(event.target.value, 10))
              }
              min={0}
              max={dates.length - 1}
              value={sliderIndex}
              type="range"
            />
          </div>
          <div className="map-start-stop-label">
            <div className="column">{formatDate(parseDate(dates[0]))}</div>
            <div className="column">
              {formatDate(parseDate(dates[dates.length - 1]))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="dashboard-toggle add-margin-small"
        onClick={toggleMapStyle}
        onKeyPress={toggleMapStyle}
        role="switch"
        aria-checked={useChoropleth}
        tabIndex={0}
      >
        <span className={useChoropleth ? '' : 'active'}>Bubble Map</span>
        <span className={useChoropleth ? 'active' : ''}>Choropleth Map</span>
      </div>
      {rawStateData && (
        <Map
          rawStateData={rawStateData}
          setJoinedData={setJoinedData}
          getValue={getValue}
          currentDate={currentDate}
          currentField={currentField}
          useChoropleth={useChoropleth}
        />
      )}
    </div>
  )
}

export default MapContainer
