import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

export default ({
  stateSlug,
  onDefinitionsToggle,
  deathsLabel,
  death,
  deathConfirmed,
  deathProbable,
  recovered,
  national,
}) => {
  const fields = ['recovered', 'death']
  if (deathProbable) {
    fields.push('deathProbable')
  }
  if (deathConfirmed) {
    fields.push('deathConfirmed')
  }

  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title="Outcomes"
      link={
        <Link
          to={
            national
              ? '/data/national/outcomes'
              : `/data/state/${stateSlug}/outcomes`
          }
        >
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Recovered" value={recovered}>
          <DefinitionLink
            label="Recovered"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'recovered',
              })
            }}
          />
        </Statistic>
        <Statistic title={deathsLabel} value={death}>
          <DefinitionLink
            label={deathsLabel}
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'death',
              })
            }}
          />
        </Statistic>
        {deathProbable && (
          <Statistic
            title="Probable deaths"
            value={deathProbable}
            definitionLink="#"
            onDefinitionsToggle={onDefinitionsToggle}
            subelement
          >
            <DefinitionLink
              label="Probable deaths"
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'deathProbable',
                })
              }}
            />
          </Statistic>
        )}
        {deathConfirmed && (
          <Statistic
            title="Confirmed deaths"
            value={deathConfirmed}
            definitionLink="#"
            onDefinitionsToggle={onDefinitionsToggle}
            subelement
          >
            <DefinitionLink
              label="Confirmed deaths"
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'deathConfirmed',
                })
              }}
            />
          </Statistic>
        )}
      </CardBody>
    </Card>
  )
}
