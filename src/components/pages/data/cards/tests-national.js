import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import {
  Statistic,
  DefinitionLink,
  DrillDown,
} from '~components/common/statistic'

const TestNationalCard = ({
  totalTestResults,
  totalTestResultsIncrease,
  totalTestResulstPercentIncrease,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = ['totalTestResults', 'totalTestResultsIncrease']
  const percentIncrease =
    Math.round(totalTestResulstPercentIncrease * 100 * 10) / 10
  return (
    <Card
      title="Tests"
      link={
        <Link to="/data/national/tests">
          Historical data <span className="a11y-only"> for national tests</span>
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total tests" value={totalTestResults}>
          <DefinitionLink
            label="Total tests"
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'totalTestResults',
              })
            }}
          />
        </Statistic>
        <DrillDown
          label="New tests today"
          value={totalTestResultsIncrease}
          calculated
        />
        <DrillDown
          label="Change over 7 days"
          value={percentIncrease}
          suffix={`%${percentIncrease > 0 ? '+' : '-'}`}
          calculated
        />
      </CardBody>
    </Card>
  )
}

export default TestNationalCard
