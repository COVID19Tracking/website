import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const OutcomesCard = ({
  stateSlug,
  stateName,
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
              ? '/data/national/deaths'
              : `/data/state/${stateSlug}/outcomes`
          }
        >
          <span className="a11y-only">
            {national ? 'national' : stateName} outcomes{' '}
          </span>
          Historical data
        </Link>
      }
    >
      <CardBody>
        {!national && (
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
        )}
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
        {national && (
          <CardNote>
            We have{' '}
            <Link to="/about-data/faq#removed-national">
              removed recovered data for the US. Here&apos;s why
            </Link>
            .
          </CardNote>
        )}
      </CardBody>
    </Card>
  )
}

export default OutcomesCard
