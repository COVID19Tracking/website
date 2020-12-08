/* eslint-disable max-len */
import React, { useContext } from 'react'
import { Card, CardNote, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const HospitalizationHHSCard = ({ hhsHospitalization }) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'hhsICUConfirmedSuspected',
    'hhsHospitalizedConfirmed',
    'hhsHospitalizedConfirmedSuspected',
  ]
  return (
    <Card title="Hospitalization (HHS data)">
      <CardBody>
        <Statistic
          title="Now hospitalized (confirmed + suspected)"
          value={parseInt(hhsHospitalization.inpatient_beds_used_covid, 10)}
        >
          <DefinitionLink
            label="Now hospitalized (confirmed + suspected)"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'hhsHospitalizedConfirmedSuspected',
              })
            }}
          />
        </Statistic>
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
        >
          <DefinitionLink
            label="Now hospitalized (confirmed only)"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'hhsHospitalizedConfirmed',
              })
            }}
          />
        </Statistic>
        <Statistic
          title="Now in ICU  (confirmed + suspected)"
          value={parseInt(
            hhsHospitalization.staffed_icu_adult_patients_confirmed_and_suspected_covid,
            10,
          )}
        >
          <DefinitionLink
            label="Now in ICU  (confirmed + suspected)"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'hhsICUConfirmedSuspected',
              })
            }}
          />
        </Statistic>
        <CardNote>
          This data is{' '}
          <a href="https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-state">
            published by HHS
          </a>
          .
        </CardNote>
        <LastUpdatedLabel date={hhsHospitalization.reporting_cutoff_start} />
      </CardBody>
    </Card>
  )
}

export default HospitalizationHHSCard
