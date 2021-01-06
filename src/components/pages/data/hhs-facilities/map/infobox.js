/* eslint-disable max-len */
import React from 'react'
import FieldValue from '../field-value'
import Infobox from '~components/common/map/infobox'

const HhsInfobox = ({ layer, facility, x, y }) => (
  <Infobox x={x} y={y}>
    <h3>{facility.hospital_name}</h3>
    {layer === 'patients' && (
      <>
        <p>
          <strong>Adult COVID-19 patients currently in hospital:</strong>{' '}
          <FieldValue
            field={
              facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg
            }
          />
        </p>
        <p>
          <strong>
            Percent of inpatient beds occupied by COVID-19 patients:
          </strong>{' '}
          <FieldValue
            field={facility.adult_inpatient_beds_occupancy_covid}
            percent
          />
        </p>
      </>
    )}

    {layer === 'icu' && (
      <>
        <p>
          <strong>Adult COVID-19 ICU patients currently in hospital:</strong>{' '}
          <FieldValue
            field={
              facility.staffed_icu_adult_patients_confirmed_and_suspected_covid_7_day_avg
            }
          />
        </p>
        <p>
          <strong>Percent of ICU beds occupied by COVID-19 patients:</strong>{' '}
          <FieldValue field={facility.adult_icu_beds_occupancy_covid} percent />
        </p>
      </>
    )}
    <p>Click to view more information</p>
  </Infobox>
)

export default HhsInfobox
