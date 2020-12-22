/* eslint-disable max-len */
import React from 'react'
import infoboxStyle from './infobox.module.scss'

const Infobox = ({ facility, x, y }) => (
  <div
    className={infoboxStyle.infobox}
    style={{
      left: Math.max(10, x - 175),
      top: y + 15,
    }}
  >
    <h3>{facility.hospital_name}</h3>
    <p>
      <strong>Adult COVID-19 patients currently in hospital:</strong>{' '}
      {typeof facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg !==
      'undefined' ? (
        <>
          {facility.adult_inpatient_beds_occupancy_covid >= 0 ? (
            <>
              {Math.round(
                facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg,
              )}
            </>
          ) : (
            'between 0 and 4'
          )}
        </>
      ) : (
        <>N/A</>
      )}
    </p>
    <p>
      <strong>Percent of inpatient beds occupied by COVID-19 patients:</strong>{' '}
      {typeof facility.adult_inpatient_beds_occupancy_covid !== 'undefined' ? (
        <>
          {facility.adult_inpatient_beds_occupancy_covid >= 0
            ? `${Math.round(
                facility.adult_inpatient_beds_occupancy_covid * 100,
              )}%`
            : 'between 0 and 4%'}
        </>
      ) : (
        <>N/A</>
      )}
    </p>
    <p>Click to view more information</p>
  </div>
)

export default Infobox
