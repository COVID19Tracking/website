/* eslint-disable max-len */
import React from 'react'
import FieldValue from '../field-value'
import infoboxStyle from './infobox.module.scss'
import alertBang from '~images/alert/alert-bang.svg'

const Infobox = ({ layer, facility, x, y }) => (
  <div
    className={infoboxStyle.infobox}
    style={{
      left: Math.max(10, x - 175),
      top: y + 15,
    }}
  >
    <h3>{facility.hospital_name}</h3>

    {layer === 'patients' && (
      <>
        {facility.anomaly_flag_inpt && (
          <div className={infoboxStyle.alert}>
            <img src={alertBang} aria-hidden alt="" />
            <p>This facility has a data anomaly</p>
          </div>
        )}
        <p>
          <strong>Adult COVID-19 patients in hospital:</strong>{' '}
          <FieldValue
            field={
              facility.total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg
            }
          />
        </p>
        <p>
          <strong>% inpatient beds used by COVID-19 patients:</strong>{' '}
          <FieldValue
            field={facility.adult_inpatient_beds_occupancy_covid}
            percent
          />
        </p>
        <p>
          <strong>% inpatient beds used by all patients:</strong>{' '}
          <FieldValue
            field={facility.adult_inpatient_beds_occupancy_all}
            percent
          />
        </p>
      </>
    )}

    {layer === 'icu' && (
      <>
        {facility.anomaly_flag_icu && (
          <div className={infoboxStyle.alert}>
            <img src={alertBang} alt="" />
            <p>This facility has anomalies</p>
          </div>
        )}
        <p>
          <strong>Adult COVID-19 patients in ICU:</strong>{' '}
          <FieldValue
            field={
              facility.staffed_icu_adult_patients_confirmed_and_suspected_covid_7_day_avg
            }
          />
        </p>
        <p>
          <strong>% ICU beds used by COVID-19 patients:</strong>{' '}
          <FieldValue field={facility.adult_icu_beds_occupancy_covid} percent />
        </p>
        <p>
          <strong>% ICU beds used by all patients:</strong>{' '}
          <FieldValue field={facility.adult_icu_beds_occupancy_all} percent />
        </p>
      </>
    )}
    <p>Click to view more information</p>
  </div>
)

export default Infobox
