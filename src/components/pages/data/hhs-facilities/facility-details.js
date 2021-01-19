import React from 'react'
import { Link } from 'gatsby'
import FieldValue from './field-value'
import facilityDetailsStyle from './facility-details.module.scss'
import alertBang from '~images/alert/alert-bang.svg'
import SocialSharing from '~components/common/social-sharing'

const fields = [
  {
    title: 'Adult COVID-19 patients currently in hospital',
    field:
      'total_adult_patients_hospitalized_confirmed_and_suspected_covid_7_day_avg',
  },
  {
    title: 'Percent of adult inpatient beds occupied by COVID-19 patients',
    percent: true,
    field: 'adult_inpatient_beds_occupancy_covid',
    value: value => `${Math.round(value * 100)}%`,
  },
  {
    title: 'Percent of adult inpatient beds occupied by all patients',
    percent: true,
    field: 'adult_inpatient_beds_occupancy_all',
    value: value => (value === null ? 'N/A' : `${Math.round(value * 100)}%`),
  },
  {
    title: 'Available adult inpatient beds',
    field: 'adult_inpatient_beds_available',
  },
  {
    title: 'Adult COVID-19 patients currently in ICU',
    field: 'staffed_icu_adult_patients_confirmed_and_suspected_covid_7_day_avg',
  },
  {
    title: 'Percent of adult ICU beds occupied by COVID-19 patients',
    percent: true,
    field: 'adult_icu_beds_occupancy_covid',
    value: value => `${Math.round(value * 100)}%`,
  },
  {
    title: 'Percent of adult ICU beds occupied by all patients',
    percent: true,
    field: 'adult_icu_beds_occupancy_all',
    value: value => `${Math.round(value * 100)}%`,
  },
  {
    title: 'Available adult ICU beds',
    field: 'adult_icu_beds_available',
  },
  {
    title: 'Reporting completeness',
    field: 'mean_coverage',
    percent: true,
    value: value => `${Math.round(value * 100)}%`,
  },
  {
    title: 'Reporting week (spans Friday to Thursday)',
    field: 'collection_week',
    raw: true,
  },
]

const FacilityDetails = ({ facility, hideSharing = false }) => (
  <>
    <h2>
      {facility.hospital_name}
      {!hideSharing && (
        <span className={facilityDetailsStyle.sharing}>
          <SocialSharing
            shares={['link']}
            url={`https://covidtracking.com/data/hospital-facilities${typeof window !==
              'undefined' && window.location.hash},id:${facility.hospital_pk}`}
          />
        </span>
      )}
    </h2>
    {facility.anomaly_flag_inpt || facility.anomaly_flag_icu ? (
      <div className={facilityDetailsStyle.alert}>
        <img src={alertBang} aria-hidden alt="" />
        <p>
          <Link to="/data/hospital-facilities/anomalies">
            This facility has a data anomaly
          </Link>
        </p>
      </div>
    ) : null}
    <dl className={facilityDetailsStyle.details}>
      {Object.keys(fields).map(key => (
        <div key={key}>
          <dt>{fields[key].title}</dt>
          <dd>
            {fields[key].raw ? (
              facility[fields[key].field]
            ) : (
              <FieldValue
                field={facility[fields[key].field]}
                percent={fields[key].percent}
              />
            )}
          </dd>
        </div>
      ))}
    </dl>
  </>
)

export default FacilityDetails

export { fields }
