import React from 'react'
import { Link } from 'gatsby'
import {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
} from '~components/common/card'
import {
  DrillDown,
  Statistic,
  StatisticLink,
} from '~components/common/statistic'
import { Row, Col } from '~components/common/grid'
import summaryStyles from './summary.module.scss'

const SummaryCol = ({ width = [4, 3, 4], children }) => (
  <Col width={width} paddingLeft={[0, 0, 16]} paddingRight={[0, 0, 0]}>
    {children}
  </Col>
)

const SummaryRow = ({ children }) => (
  <Row className={summaryStyles.row}>{children}</Row>
)

export default ({ stateSlug, data, raceData }) => (
  <>
    <SummaryRow>
      <SummaryCol>
        <Card
          title="Cases"
          link={
            <Link to={`/data/state/${stateSlug}/cases`}>Historical data</Link>
          }
        >
          <CardBody>
            <Statistic title="Total cases" value={data.positive}>
              <StatisticLink to="#">See Sourcing</StatisticLink>
              <DrillDown label="New Cases" value={data.positiveIncrease} />
              <DrillDown
                label="Increase in 7 days"
                value={data.positiveIncrease}
              />
            </Statistic>
          </CardBody>
        </Card>
      </SummaryCol>
      <SummaryCol>
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
      </SummaryCol>
      <SummaryCol>
        <Card
          title="Hospitalization"
          link={
            <Link to={`/data/state/${stateSlug}/hospitalization`}>
              Historical data
            </Link>
          }
        >
          <CardBody>
            <Statistic title="Currently" value={data.hospitalizedCurrently} />
            <Statistic title="Cumulative" value={data.hospitalizedCumulative} />
            <CardDisclosure>
              <CardDisclsoureButton
                closed="Show ICU data"
                expanded="ICU data"
              />
              <CardDisclosurePanel>
                <Statistic
                  title="In ICU currently"
                  value={data.inIcuCurrently}
                />
                <Statistic
                  title="In ICU cumulative"
                  value={data.inIcuCumulative}
                />
                <Statistic
                  title="On ventilator currently"
                  value={data.onVentilatorCurrently}
                />
                <Statistic
                  title="On ventilator cumulative"
                  value={data.onVentilatorCumulative}
                />
              </CardDisclosurePanel>
            </CardDisclosure>
          </CardBody>
        </Card>
      </SummaryCol>
    </SummaryRow>
    <SummaryRow>
      <SummaryCol>
        <Card
          title="Outcomes"
          link={
            <Link to={`/data/state/${stateSlug}/outcomes`}>
              Historical data
            </Link>
          }
        >
          <CardBody>
            <Statistic title="Death" value={data.death} />
            <Statistic title="Recovered" value={data.recovered} />
          </CardBody>
        </Card>
      </SummaryCol>
      <SummaryCol width={[4, 3, 4]}>
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
      </SummaryCol>
    </SummaryRow>
  </>
)
