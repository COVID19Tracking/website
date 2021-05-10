import React from 'react'

import Alert from '~components/common/alert'

const NoDataReported = ({ stateAbbreviation }) => (
  <Alert>{stateAbbreviation} does not report this information. </Alert>
)

export default NoDataReported
