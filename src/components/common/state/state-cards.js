import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import {
  DrillDown,
  Statistic,
  DefinitionLink,
} from '~components/common/statistic'

const CasesCard = ({
  stateSlug,
  positive,
  positiveIncrease,
  sevenDayIncrease,
}) => {
  const sevenDayIncreasePercent = Math.round(sevenDayIncrease * 100 * 10) / 10
  const drillDownValue = Number.isNaN(sevenDayIncreasePercent)
    ? 'N/A'
    : sevenDayIncreasePercent
  const drillDownSuffix = Number.isNaN(sevenDayIncreasePercent) ? '' : '%'
  return (
    <Card
      title="Cases"
      link={<Link to={`/data/state/${stateSlug}/cases`}>Historical data</Link>}
    >
      <CardBody>
        <Statistic title="Total cases" value={positive}>
          <DefinitionLink to="#" />
          <DrillDown label="New Cases" value={positiveIncrease} />
          <DrillDown
            label="Increase in 7 days"
            value={drillDownValue}
            suffix={drillDownSuffix}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

const TestsCard = ({ stateSlug, negative, pending, posNeg }) => (
  <Card
    title="Tests"
    link={<Link to={`/data/state/${stateSlug}/tests`}>Historical data</Link>}
  >
    <CardBody>
      <Statistic title="Negative" value={negative} />
      <Statistic title="Pending" value={pending} />
      <Statistic title="Total" value={posNeg} />
    </CardBody>
  </Card>
)

const CumulativeHospitalizationCard = ({
  stateSlug,
  hospitalizedCumulative,
  inIcuCumulative,
  onVentilatorCumulative,
}) => (
  <Card
    title="Cumulative Hospitalization"
    link={
      <Link to={`/data/state/${stateSlug}/hospitalization`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      <Statistic title="Cumulative" value={hospitalizedCumulative} />
      <Statistic title="In ICU cumulative" value={inIcuCumulative} />
      <Statistic
        title="On ventilator cumulative"
        value={onVentilatorCumulative}
      />
    </CardBody>
  </Card>
)

const OutcomesCard = ({
  stateSlug,
  deathsLabel,
  death,
  deathConfirmed,
  deathProbable,
  recovered,
}) => (
  <Card
    title="Outcomes"
    link={<Link to={`/data/state/${stateSlug}/outcomes`}>Historical data</Link>}
  >
    <CardBody>
      <Statistic title="Recovered" value={recovered} />
      <Statistic title={deathsLabel} value={death} />
      {deathProbable && (
        <Statistic title="Probable deaths" value={deathProbable} />
      )}
      {deathConfirmed && (
        <Statistic title="Confirmed deaths" value={deathConfirmed} />
      )}
    </CardBody>
  </Card>
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
  CasesCard,
  TestsCard,
  CumulativeHospitalizationCard,
  OutcomesCard,
  RaceEthnicityCard,
  CurrentHospitalizationCard,
}
