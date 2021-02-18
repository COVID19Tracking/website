import React from 'react'
import { Link } from 'gatsby'

const NoDataAlert = ({ state, dataType, metric }) => (
  <span>
    {state} does not report {dataType.toLowerCase()} data for {metric}.{' '}
    <Link to="/race/get-better-data">Help us get better data.</Link>
  </span>
)

export default NoDataAlert
