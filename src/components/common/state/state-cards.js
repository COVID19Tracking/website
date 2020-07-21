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
  positive,
  positiveTestsField,
  stateSlug,
  title,
  totalTests,
  totalTestsField = 'totalTestResults',
}) => {
  const definitionContext = useContext(DefinitionPanelContext)

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
        {pending && <Statistic title="Pending" value={pending} />}
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
}) => (
  <BaseTestsCard
    fields={['negative', 'positive', 'totalTestResults']}
    negative={negative}
    negativeTestsField="negative"
    pending={pending}
    positive={positive}
    positiveTestsField="positive"
    stateSlug={stateSlug}
    title="Tests"
    totalTests={totalTestResults}
    totalTestsField="totalTestResults"
  />
)

const PCRTestsCard = ({
  stateSlug,
  totalTestsViral,
  positiveTestsViral,
  negativeTestsViral,
}) => (
  <BaseTestsCard
    fields={['negativeTestsViral', 'positiveTestsViral', 'totalTestsViral']}
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

const RaceEthnicityCard = ({ stateSlug, raceData }) => (
  <Card
    title="Race &amp; Ethnicity"
    link={
      <Link to={`/data/state/${stateSlug}/race-ethnicity`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      {raceData.combined && (
        <>
          <p>Reported race &amp; ethnicity data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.combined.knownRaceEthPos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.combined.knownRaceEthDeath * 100)}
            suffix="%"
          />
        </>
      )}
      {raceData.separate && (
        <>
          <p>Reported race data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.separate.knownRacePos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.separate.knownRaceDeath * 100)}
            suffix="%"
          />
          <p>Reported ethnicity &amp; data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.separate.knownEthPos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.separate.knownEthDeath * 100)}
            suffix="%"
          />
        </>
      )}
    </CardBody>
  </Card>
)

const CurrentHospitalizationCard = ({
  stateSlug,
  hospitalizedCurrently,
  inIcuCurrently,
  onVentilatorCurrently,
}) => (
  <Card
    title="Current Hospitalization"
    link={
      <Link to={`/data/state/${stateSlug}/hospitalization`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      <Statistic title="Currently hospitalized" value={hospitalizedCurrently} />
      <Statistic title="Currently in ICU" value={inIcuCurrently} />
      <Statistic
        title="Currently on ventilator"
        value={onVentilatorCurrently}
      />
    </CardBody>
  </Card>
)

export {
  TestsCard,
  PCRTestsCard,
  RaceEthnicityCard,
  CurrentHospitalizationCard,
}
