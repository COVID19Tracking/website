import React from 'react'
import Alert from '~components/common/alert'
import { FormatDate } from '~components/utils/format'

const FilteredNotice = ({ earliestDay, currentMetric, stateName }) => {
  return (
    <Alert>
      Prior to <FormatDate date={earliestDay.Date} format="LLLL d, yyyy" />,{' '}
      {stateName} did not report race/ethnicity data for{' '}
      {currentMetric.toLowerCase()}.
    </Alert>
  )
}

export default FilteredNotice
