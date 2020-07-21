import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from '~components/common/state/definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

export default ({
  stateSlug,
  hospitalizedCurrently,
  inIcuCurrently,
  onVentilatorCurrently,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'hospitalizedCurrently',
    'inIcuCurrently',
    'onVentilatorCurrently',
  ]

  return (
    <Card
      title="Current Hospitalization"
      link={
        <Link to={`/data/state/${stateSlug}/hospitalization`}>
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Currently hospitalized" value={hospitalizedCurrently}>
          <DefinitionLink
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
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'onVentilatorCurrently',
              })
            }}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}
