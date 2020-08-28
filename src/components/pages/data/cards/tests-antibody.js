import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const TestAntibodyCard = ({ stateSlug, totalTestsAntibody }) => {
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
        <Statistic title="Total tests" value={totalTestsAntibody}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: ['totalTestsAntibody'],
                highlight: 'totalTestsAntibody',
              })
            }}
            label="Total "
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

export default TestAntibodyCard
