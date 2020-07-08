import React from 'react'
import { Link } from 'gatsby'
import {
  Card,
  CardBody,
  CardDisclosure,
  CardDisclsoureButton,
  CardDisclosurePanel,
} from '~components/common/card'
import { Statistic, StatisticGroup } from '~components/common/statistic'
import { Row, Col } from '~components/common/grid'

const SummaryCol = ({ width = [4, 3, 2], children }) => (
  <Col width={width} paddingLeft={[0, 0, 0]} paddingRight={[0, 0, 0]}>
    {children}
  </Col>
)

export default ({ stateSlug, data, raceData }) => (
  <Row>
    <SummaryCol>
      <Card title={<Link to={`/data/state/${stateSlug}/cases`}>Cases</Link>}>
        <CardBody>
          <Statistic title="Total cases" value={data.positive} />
        </CardBody>
      </Card>
    </SummaryCol>
    <SummaryCol>
      <Card title={<Link to={`/data/state/${stateSlug}/tests`}>Test</Link>}>
        <CardBody>
          <Statistic title="Negative" value={data.negative} />
          <Statistic title="Pending" value={data.pending} />
          <Statistic title="Total" value={data.posNeg} />
        </CardBody>
      </Card>
    </SummaryCol>
    <SummaryCol>
      <Card
        title={
          <Link to={`/data/state/${stateSlug}/hospitalization`}>
            Hospitalization
          </Link>
        }
      >
        <CardBody>
          <Statistic title="Currently" value={data.hospitalizedCurrently} />
          <Statistic title="Cumulative" value={data.hospitalizedCumulative} />
          <CardDisclosure>
            <CardDisclsoureButton>ICU and ventilator data</CardDisclsoureButton>
            <CardDisclosurePanel>
              <Statistic title="In ICU currently" value={data.inIcuCurrently} />
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
    <SummaryCol>
      <Card
        title={<Link to={`/data/state/${stateSlug}/outcomes`}>Outcomes</Link>}
      >
        <CardBody>
          <Statistic title="Death" value={data.death} />
          <Statistic title="Recovered" value={data.recovered} />
        </CardBody>
      </Card>
    </SummaryCol>
    <SummaryCol width={[4, 3, 4]}>
      <Card
        title={
          <Link to={`/data/state/${stateSlug}/race-ethnicity`}>
            Race &amp; Ethnicity
          </Link>
        }
      >
        <CardBody>
          {raceData.combined && (
            <>
              <p>Reported race &amp; ethnicity data for:</p>
              <StatisticGroup>
                <Statistic
                  title="Cases"
                  value={raceData.combined.knownRaceEthPos}
                  suffix="%"
                />
                <Statistic
                  title="Death"
                  value={raceData.combined.knownRaceEthDeath}
                  suffix="%"
                />
              </StatisticGroup>
            </>
          )}
          {raceData.separate && (
            <>
              <p>Reported race data for:</p>
              <StatisticGroup>
                <Statistic
                  title="Cases"
                  value={raceData.separate.knownRacePos}
                  suffix="%"
                />
                <Statistic
                  title="Death"
                  value={raceData.separate.knownRaceDeath}
                  suffix="%"
                />
              </StatisticGroup>
              <p>Reported ethnicity &amp; data for:</p>
              <StatisticGroup>
                <Statistic
                  title="Cases"
                  value={raceData.separate.knownEthPos}
                  suffix="%"
                />
                <Statistic
                  title="Death"
                  value={raceData.separate.knownEthDeath}
                  suffix="%"
                />
              </StatisticGroup>
            </>
          )}
        </CardBody>
      </Card>
    </SummaryCol>
  </Row>
)
