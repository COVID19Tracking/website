import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
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
  national,
  note = false,
  testPath,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)

  // todo add pending definition link
  return (
    <Card
      title={title}
      link={
        <Link
          to={
            national
              ? `/data/national/${testPath}`
              : `/data/state/${stateSlug}/${testPath}`
          }
        >
          Historical data
        </Link>
      }
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
        {positive !== false && (
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
        )}
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
        {note && <CardNote>{note}</CardNote>}
      </CardBody>
    </Card>
  )
}

const TestsCard = ({
  stateSlug,
  negative,
  pending,
  totalTestResults,
  national,
}) => {
  const fields = ['negative', 'totalTestResults']
  if (pending) {
    fields.splice(2, 0, 'pending') // add pending after positive
  }

  return (
    <BaseTestsCard
      fields={fields}
      negative={negative}
      negativeTestsField="negative"
      positive={false}
      pending={pending}
      pendingTestsField="pending"
      stateSlug={stateSlug}
      title="Tests"
      totalTests={totalTestResults}
      totalTestsField="totalTestResults"
      national={national}
      testPath="tests"
    />
  )
}

const PCRTestsCard = ({
  stateSlug,
  totalTestsViral,
  positiveTestsViral,
  negativeTestsViral,
  national,
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
    national={national}
    note="This might be larger than the total number of tests, due to difference in units."
    testPath="tests-pcr"
  />
)

export { TestsCard, PCRTestsCard }
