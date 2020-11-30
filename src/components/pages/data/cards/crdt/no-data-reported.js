import React from 'react'
import { Link } from 'gatsby'

import Alert from '~components/common/alert'

const NoDataReported = ({ stateAbbreviation }) => (
  <Alert>
    {stateAbbreviation} does not report this information.{' '}
    <Link to="/race/get-better-data">Help us get better data.</Link>
  </Alert>
)

export default NoDataReported
