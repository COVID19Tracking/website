import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const TestAntibodyCard = ({
  stateSlug,
  stateName,
  totalTestsAntibody,
  totalTestsPeopleAntibody,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const definitionFields = ['totalTestsAntibody', 'totalTestsPeopleAntibody']
  return (
    <Card
      title="Antibody tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-antibody`}>
          <span className="a11y-only">{stateName} antibody testing </span>
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total tests (specimens)" value={totalTestsAntibody}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'totalTestsAntibody',
              })
            }}
            label="Total antibody tests in specimens"
          />
        </Statistic>
        <Statistic
          title="Total tests (people)"
          value={totalTestsPeopleAntibody}
        >
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'totalTestsPeopleAntibody',
              })
            }}
            label="Total antibody tests in people"
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

export default TestAntibodyCard
