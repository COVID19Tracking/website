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
  national,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'hospitalizedCumulative',
    'inIcuCumulative',
    'onVentilatorCumulative',
  ]

  return (
    <Card
      title="Cumulative Hospitalization"
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
        <Statistic
          title="Cumulative hospitalized"
          value={hospitalizedCumulative}
        >
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'hospitalizedCumulative',
              })
            }}
          />
        </Statistic>
        <Statistic title="Cumulative in ICU" value={inIcuCumulative}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'inIcuCumulative',
              })
            }}
          />
        </Statistic>
        <Statistic
          title="Cumulative on ventilator"
          value={onVentilatorCumulative}
        >
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'onVentilatorCumulative',
              })
            }}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}
