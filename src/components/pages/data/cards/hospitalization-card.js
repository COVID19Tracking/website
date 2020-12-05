import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardHeading, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const HospitalizationCard = ({
  stateSlug,
  stateName,
  hospitalizedCumulative,
  inIcuCumulative,
  onVentilatorCumulative,
  hospitalizedCurrently,
  inIcuCurrently,
  onVentilatorCurrently,
  national,
  hhsHospitalization,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'hospitalizedCumulative',
    'inIcuCumulative',
    'onVentilatorCumulative',
    'hospitalizedCurrently',
    'inIcuCurrently',
    'onVentilatorCurrently',
  ]

  return (
    <Card
      title="Hospitalization"
      link={
        <Link
          to={
            national
              ? '/data/national/hospitalization'
              : `/data/state/${stateSlug}/hospitalization`
          }
        >
          <span className="a11y-only">
            {national ? 'National' : stateName} hospitalization{' '}
          </span>
          Historical data
        </Link>
      }
    >
      <CardBody>
        {national ? (
          <>
            <Statistic
              title="Currently hospitalized"
              value={hospitalizedCurrently}
            >
              <DefinitionLink
                label="Currently hospitalized"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'hospitalizedCurrently',
                  })
                }}
              />
            </Statistic>
            <Statistic title="Currently in ICU" value={inIcuCurrently}>
              <DefinitionLink
                label="Currently in ICU"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'inIcuCurrently',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Currently on ventilator"
              value={onVentilatorCurrently}
            >
              <DefinitionLink
                label="Currently on ventilator"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'onVentilatorCurrently',
                  })
                }}
              />
            </Statistic>
          </>
        ) : (
          <>
            <Statistic title="Ever hospitalized" value={hospitalizedCumulative}>
              <DefinitionLink
                label="Ever hospitalized"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'hospitalizedCumulative',
                  })
                }}
              />
            </Statistic>

            <Statistic
              title="Now hospitalized"
              value={hospitalizedCurrently}
              subelement
            >
              <DefinitionLink
                label="Now hospitalized"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'hospitalizedCurrently',
                  })
                }}
              />
            </Statistic>
            <Statistic title="Ever in ICU" value={inIcuCumulative}>
              <DefinitionLink
                label="Ever in ICU"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'inIcuCumulative',
                  })
                }}
              />
            </Statistic>
            <Statistic title="Now in ICU" value={inIcuCurrently} subelement>
              <DefinitionLink
                label="Now in ICU"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'inIcuCurrently',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Ever on ventilator"
              value={onVentilatorCumulative}
            >
              <DefinitionLink
                label="Ever on ventilator"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'onVentilatorCumulative',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Now on ventilator"
              value={onVentilatorCurrently}
              subelement
            >
              <DefinitionLink
                label="Now on ventilator"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'onVentilatorCurrently',
                  })
                }}
              />
            </Statistic>
          </>
        )}

        {hhsHospitalization && (
          <>
            <CardHeading>HHS Federal data</CardHeading>
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

            <LastUpdatedLabel
              date={hhsHospitalization.reporting_cutoff_start}
              label="HHS data as of"
            />
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default HospitalizationCard
