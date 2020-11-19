import React from 'react'
import { Link } from 'gatsby'

import Alert from '~components/common/alert'

const NoDataReported = ({ stateName, type }) => (
  <Alert>
    {stateName} does not report race/ethnicity data for {type}.
    <br />
    <Link to="/race/get-better-data">Help us get better data</Link>
  </Alert>
)

export default NoDataReported
