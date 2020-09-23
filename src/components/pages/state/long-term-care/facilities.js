import React from 'react'
import TableResponsive from '~components/common/table-responsive'

const LongTermCareFacilities = ({ facilities }) => (
  <TableResponsive
    labels={[
      {
        label: 'County',
        field: 'county',
      },
      {
        label: 'City',
        field: 'city',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        field: 'type',
        label: 'Type',
      },
      { field: 'resident_positive', label: 'Resident positives' },
      { field: 'resident_deaths', label: 'Resident death' },
    ]}
    data={facilities}
  />
)

export default LongTermCareFacilities
