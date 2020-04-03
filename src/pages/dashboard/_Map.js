import React, { useState } from 'react'
import { select } from 'd3-selection'
import { timeFormat, format, timeParse } from 'd3-format'

export default function Map() {
  const formatDate = timeFormat('%b. %d')
  const formatNumber = format(',.0f')
  const parseDate = timeParse('%Y%m%d')

  const colors = {
    totalTestResults: '#696DC2',
    positive: '#E5A968',
    death: '#404856',
  }
  const getValue = (d, field = currentField, normalized = false) =>
    ((d.properties.dailyData[currentDate] &&
      d.properties.dailyData[currentDate][field]) ||
      0) / (normalized ? d.properties.population / 1000000 : 1)

  // holds all data in geojson objects
  const [joinedData, setJoinedData] = useState(null)
  // holds the date of the displayed day
  const [currentDate, setCurrentDate] = useState('')
  // holds the field we are currently viewing
  const [currentField, setCurrentField] = useState('positive')

  const [usechoropleth, setUseChoropleth] = useState(false)

  console.log('test: ', select('.test'))
  return <div className="test">Map</div>
}
