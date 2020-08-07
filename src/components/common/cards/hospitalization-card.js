import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

export default ({
  stateSlug,
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
          Historical data
        </Link>
      }
    >
      <CardBody>
        {national ? (
          <>
            <Statistic
              title="Currently Hospitalized"
              value={hospitalizedCurrently}
            >
              <DefinitionLink
                label="Currently Hospitalized"
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
            <Statistic
              title="Total hospitalized"
              value={hospitalizedCumulative}
            >
              <DefinitionLink
                label="Total hospitalized"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'hospitalizedCumulative',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Currently hospitalized"
              value={hospitalizedCurrently}
              subelement
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
            <Statistic title="Total in ICU" value={inIcuCumulative}>
              <DefinitionLink
                label="Total in ICU"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'inIcuCumulative',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Currently in ICU"
              value={inIcuCurrently}
              subelement
            >
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
              title="Total on ventilator"
              value={onVentilatorCumulative}
            >
              <DefinitionLink
                label="Total on ventilator"
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'onVentilatorCumulative',
                  })
                }}
              />
            </Statistic>
            <Statistic
              title="Currently on ventilator"
              value={onVentilatorCurrently}
              subelement
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
        )}
      </CardBody>
    </Card>
  )
}
