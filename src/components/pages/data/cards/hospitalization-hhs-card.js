/* eslint-disable max-len */
import React from 'react'
import { Card, CardNote, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const HospitalizationHHSCard = ({ hhsHospitalization }) => {
  return (
    <Card title="Hospitalizations (HHS dataset)">
      <CardBody>
        <Statistic
          title="Now hospitalized (confirmed + suspected)"
          value={parseInt(hhsHospitalization.inpatient_beds_used_covid, 10)}
        />
        <Statistic
          title="Now hospitalized (confirmed only)"
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
          subelement
        />
        <Statistic
          title="Now in ICU  (confirmed + suspected)"
          value={parseInt(
            hhsHospitalization.staffed_icu_adult_patients_confirmed_and_suspected_covid,
            10,
          )}
        />
        <CardNote>
          This data is from the <a href="/">HHS data thingy</a>. We include it
          because it&apos;s important.
        </CardNote>
        <LastUpdatedLabel date={hhsHospitalization.reporting_cutoff_start} />
      </CardBody>
    </Card>
  )
}

export default HospitalizationHHSCard
