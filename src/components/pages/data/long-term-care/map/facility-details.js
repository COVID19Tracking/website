import React from 'react'
import facilityDetailsStyle from './facility-details.module.scss'

const fields = [
  {
    title: 'Resident positives',
    field: 'resident_positives',
  },
  {
    title: 'Resident deaths',
    field: 'resident_deaths',
  },
  {
    title: 'Outbreak resident positives',
    field: 'outbreak_resident_positives',
  },
  {
    title: 'Outbreak resident deaths',
    field: 'outbreak_resident_deaths',
  },
  {
    title: 'Staff cases',
    field: 'staff_positives',
  },
  {
    title: 'Staff deaths',
    field: 'staff_deaths',
  },
]

const FacilityDetails = ({ facility }) => (
  <>
    <h2>{facility.facility_name}</h2>

    <dl className={facilityDetailsStyle.details}>
      {Object.keys(fields).map(key => (
        <div key={key}>
          <dt>{fields[key].title}</dt>
          <dd>{facility[fields[key].field] || <>N/A</>}</dd>
        </div>
      ))}
    </dl>
  </>
)

export default FacilityDetails

export { fields }
