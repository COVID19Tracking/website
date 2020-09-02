import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const TestsViralCard = ({
  stateSlug,
  totalTestEncountersViral,
  totalTestsViral,
  totalTestsPeopleViral,
  unknownUnits = false,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'totalTestEncountersViral',
    'totalTestsViral',
    'totalTestsPeopleViral',
  ]
  return (
    <Card
      title="Viral (PCR) tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-viral`}>Historical data</Link>
      }
    >
      <CardBody>
        {unknownUnits ? (
          <Statistic
            title={
              <>
                Total tests
                <br />
                (in unclear units)
              </>
            }
            value={totalTestsViral}
          >
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'totalTestsViral',
                })
              }}
              label="Total tests (unclear units)"
            />
          </Statistic>
        ) : (
          <>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in test encounters)
                </>
              }
              value={totalTestEncountersViral}
            >
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestEncountersViral',
                  })
                }}
                label="Total tests (test encounters)"
              />
            </Statistic>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in specimens)
                </>
              }
              value={totalTestsViral}
            >
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsViral',
                  })
                }}
                label="Total tests (specimens)"
              />
            </Statistic>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in people)
                </>
              }
              value={totalTestsPeopleViral}
            >
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsPeopleViral',
                  })
                }}
                label="Total tests (people)"
              />
            </Statistic>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default TestsViralCard
