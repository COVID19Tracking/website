import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import {
  DrillDown,
  Statistic,
  DefinitionLink,
} from '~components/common/statistic'
import summaryStyles from './summary.module.scss'

// const SummaryCol = ({ width = [4, 3, 4], children }) => (

export default ({ stateSlug, data, raceData }) => {
  const deathsLabel =
    data.deathProbable || data.deathConfirmed ? 'Total deaths' : 'Deaths'
  return (
    <div className={summaryStyles.container}>
      <Card
        title="Cases"
        link={
          <Link to={`/data/state/${stateSlug}/cases`}>Historical data</Link>
        }
      >
        <CardBody>
          <Statistic title="Total cases" value={data.positive}>
            <DefinitionLink to="#" />
            <DrillDown label="New Cases" value={data.positiveIncrease} />
            <DrillDown
              label="Increase in 7 days"
              value={data.positiveIncrease}
            />
            {/* todo set the 7 day change value */}
            {/* Hm, so this is a little harder than it sounds since you can't do transforms in Gatsby after all sources are loaded, so this would be difficult. I have a proposal out for putting this into the API eventually. Maybe check out what @Gabe O'Leary did in /src/components/common/summary-charts - that dailyAverage function could be moved to be an include. */}
          </Statistic>
        </CardBody>
      </Card>
      <Card
        title="Tests"
        link={
          <Link to={`/data/state/${stateSlug}/tests`}>Historical data</Link>
        }
      >
        <CardBody>
          <Statistic title="Negative" value={data.negative} />
          <Statistic title="Pending" value={data.pending} />
          <Statistic title="Total" value={data.posNeg} />
        </CardBody>
      </Card>
      <Card
        title="Cumulative Hospitalization"
        link={
          <Link to={`/data/state/${stateSlug}/hospitalization`}>
            Historical data
          </Link>
        }
      >
        <CardBody>
          <Statistic title="Cumulative" value={data.hospitalizedCumulative} />
          <Statistic title="In ICU cumulative" value={data.inIcuCumulative} />
          <Statistic
            title="On ventilator cumulative"
            value={data.onVentilatorCumulative}
          />
        </CardBody>
      </Card>
      <Card
        title="Outcomes"
        link={
          <Link to={`/data/state/${stateSlug}/outcomes`}>Historical data</Link>
        }
      >
        <CardBody>
          <Statistic title="Recovered" value={data.recovered} />
          <Statistic title={deathsLabel} value={data.death} />
          {data.deathProbable && (
            <Statistic title="Probable deaths" value={data.deathProbable} />
          )}
          {data.deathConfirmed && (
            <Statistic title="Confirmed deaths" value={data.deathConfirmed} />
          )}
        </CardBody>
      </Card>
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
      <Card
        title="Current Hospitalization"
        link={
          <Link to={`/data/state/${stateSlug}/hospitalization`}>
            Historical data
          </Link>
        }
      >
        <CardBody>
          <Statistic
            title="Currently hospitalized"
            value={data.hospitalizedCurrently}
          />
          <Statistic title="Currently in ICU" value={data.inIcuCurrently} />
          <Statistic
            title="Currently on ventilator"
            value={data.onVentilatorCurrently}
          />
        </CardBody>
      </Card>
    </div>
  )
}
