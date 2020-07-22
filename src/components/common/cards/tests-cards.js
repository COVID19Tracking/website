import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const BaseTestsCard = ({
  fields = [],
  negative,
  negativeTestsField,
  pending,
  pendingTestsField,
  positive,
  positiveTestsField,
  stateSlug,
  title,
  totalTests,
  totalTestsField = 'totalTestResults',
}) => {
  const definitionContext = useContext(DefinitionPanelContext)

  // todo add pending definition link
  return (
    <Card
      title={title}
      link={<Link to={`/data/state/${stateSlug}/tests`}>Historical data</Link>}
    >
      <CardBody>
        <Statistic title="Total tests" value={totalTests}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: totalTestsField,
              })
            }}
          />
        </Statistic>
        <Statistic title="Positive" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: positiveTestsField,
              })
            }}
          />
        </Statistic>
        {pending && (
          <Statistic title="Pending" value={pending}>
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: pendingTestsField,
                })
              }}
            />
          </Statistic>
        )}
        <Statistic title="Negative" value={negative}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: negativeTestsField,
              })
            }}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

const TestsCard = ({
  stateSlug,
  negative,
  pending,
  totalTestResults,
  positive,
}) => {
  const fields = ['negative', 'positive', 'totalTestResults']
  if (pending) {
    fields.splice(2, 0, 'pending') // add pending after positive
  }

  return (
    <BaseTestsCard
      fields={fields}
      negative={negative}
      negativeTestsField="negative"
      pending={pending}
      pendingTestsField="pending"
      positive={positive}
      positiveTestsField="positive"
      stateSlug={stateSlug}
      title="Tests"
      totalTests={totalTestResults}
      totalTestsField="totalTestResults"
    />
  )
}

const PCRTestsCard = ({
  stateSlug,
  totalTestsViral,
  positiveTestsViral,
  negativeTestsViral,
}) => (
  <BaseTestsCard
    fields={['totalTestsViral', 'positiveTestsViral', 'negativeTestsViral']}
    negative={negativeTestsViral}
    negativeTestsField="negativeTestsViral"
    positive={positiveTestsViral}
    positiveTestsField="positiveTestsViral"
    stateSlug={stateSlug}
    title="Tests (PCR)"
    totalTests={totalTestsViral}
    totalTestsField="totalTestsViral"
  />
)

export { TestsCard, PCRTestsCard }
