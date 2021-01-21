import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardNote, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const TestsAntigenCard = ({
  stateSlug,
  stateName,
  totalTestsAntigen,
  totalTestsPeopleAntigen,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const definitionFields = ['totalTestsAntigen', 'totalTestsPeopleAntigen']
  return (
    <Card
      title="Antigen tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-antigen`}>
          <span className="a11y-only">{stateName} antigen testing </span>
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total tests (specimens)" value={totalTestsAntigen}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'totalTestsAntigen',
              })
            }}
            label="Total antigen tests in specimens"
          />
        </Statistic>
        <Statistic title="Total tests (people)" value={totalTestsPeopleAntigen}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: definitionFields,
                highlight: 'totalTestsPeopleAntigen',
              })
            }}
            label="Total antigen tests in people"
          />
        </Statistic>
        <CardNote>
          <b>Warning</b>: Antigen reporting may{' '}
          <Link to="/analysis-updates/antigen-testing-reporting">
            significantly understate
          </Link>{' '}
          the true number of tests administered
        </CardNote>
      </CardBody>
    </Card>
  )
}

export default TestsAntigenCard
