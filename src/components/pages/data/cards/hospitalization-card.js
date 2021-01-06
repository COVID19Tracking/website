import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

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
            <CardNote>
              <Link to="/data/hospital-facilities">
                See HHS hospitalization data on a map
              </Link>
              .
            </CardNote>
          </>
        ) : (
          <>
            <Statistic title="Now hospitalized" value={hospitalizedCurrently}>
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
            <Statistic title="Now in ICU" value={inIcuCurrently}>
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
            <Statistic title="Now on ventilator" value={onVentilatorCurrently}>
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
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default HospitalizationCard
