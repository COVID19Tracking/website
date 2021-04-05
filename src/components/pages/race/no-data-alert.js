import React from 'react'

const NoDataAlert = ({ state, dataType, metric }) => (
  <span>
    {state} did not report {dataType.toLowerCase()} data for {metric} through
    March 7, 2021.
  </span>
)

export default NoDataAlert
