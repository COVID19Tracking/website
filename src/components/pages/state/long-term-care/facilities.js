import React from 'react'
import TableResponsive from '~components/common/table-responsive'

const LongTermCareFacilities = ({ facilities }) => {
  const facilityList = facilities
    .map(group => group.nodes[0])
    .sort((a, b) => (a.name > b.name ? 1 : -1))
  return (
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
          field: 'facility_name',
        },
        {
          label: 'Type',
          field: 'facility_type_state',
        },
        { field: 'resident_positive', label: 'Resident positives' },
        { field: 'resident_deaths', label: 'Resident death' },
      ]}
      data={facilityList}
    />
  )
}

export default LongTermCareFacilities
