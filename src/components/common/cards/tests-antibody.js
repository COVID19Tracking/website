import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

export default ({ stateSlug }) => {
  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title="Antibody tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-antibody`}>
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total" value={0}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: ['positive'],
                highlight: 'positive',
              })
            }}
            label="Total "
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}
