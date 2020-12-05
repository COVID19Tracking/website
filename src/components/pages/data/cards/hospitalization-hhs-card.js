/* eslint-disable max-len */
import React from 'react'
import { Card, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const HospitalizationHHSCard = ({ hhsHospitalization }) => {
  return (
    <Card title="HHS Hospitalization">
      <CardBody>
        <Statistic
          title="Now hospitalized, suspected"
          value={parseInt(hhsHospitalization.inpatient_beds_used_covid, 10)}
        />
        <Statistic
          title="Now in ICU"
          value={parseInt(
            hhsHospitalization.staffed_icu_adult_patients_confirmed_and_suspected_covid,
            10,
          )}
        />
        <Statistic
          title="Now hospitalized, confirmed"
          value={
            parseInt(
              hhsHospitalization.total_adult_patients_hospitalized_confirmed_covid,
              10,
            ) +
            parseInt(
              hhsHospitalization.total_pediatric_patients_hospitalized_confirmed_covid,
              10,
            )
          }
        />
        <LastUpdatedLabel date={hhsHospitalization.reporting_cutoff_start} />
      </CardBody>
    </Card>
  )
}

export default HospitalizationHHSCard
