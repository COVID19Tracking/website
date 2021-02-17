import React from 'react'
import { Link } from 'gatsby'

const NoDataInner = ({ state, dataType, metric, className }) => (
  <span className={className}>
    {state} does not report {dataType.toLowerCase()} data for{' '}
    {metric.toLowerCase()}.{' '}
    <Link to="/race/get-better-data">Help us get better data.</Link>
  </span>
)

export default NoDataInner
