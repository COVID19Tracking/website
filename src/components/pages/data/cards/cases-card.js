import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
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
  probableCases,
  confirmedCases,
  national,
}) => {
  const sevenDayIncreasePercent = Math.round(sevenDayIncrease * 100 * 10) / 10
  const drillDownValue = Number.isNaN(sevenDayIncreasePercent)
    ? 'N/A'
    : sevenDayIncreasePercent
  let drillDownSuffix = Number.isNaN(sevenDayIncreasePercent) ? '' : '%'
  const definitionContext = useContext(DefinitionPanelContext)
  if (drillDownValue !== 'N/A') {
    drillDownSuffix += drillDownValue > 0 ? '+' : '-'
  }
  return (
    <Card
      title="Cases"
      link={
        <Link
          to={
            national ? '/data/national/cases' : `/data/state/${stateSlug}/cases`
          }
        >
          Historical data <span className="a11y-only"> for cases</span>
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total cases" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: ['positive', 'positiveCasesViral'],
                highlight: 'positive',
              })
            }}
            label="Total cases"
          />
        </Statistic>
        {confirmedCases && (
          <Statistic title="Confirmed cases" value={confirmedCases}>
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields: ['positive', 'positiveCasesViral'],
                  highlight: 'positiveCasesViral',
                })
              }}
              label="Confirmed cases"
            />
          </Statistic>
        )}
        {probableCases && (
          <Statistic title="Probable cases" value={probableCases}>
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields: ['positive', 'positiveCasesViral', 'probableCases'],
                  highlight: 'probableCases',
                })
              }}
              label="Probable Cases"
            />
          </Statistic>
        )}
        <DrillDown
          label="New cases today"
          value={positiveIncrease}
          calculated
        />
        <DrillDown
          label="Change over 7 days"
          value={drillDownValue}
          suffix={drillDownSuffix}
          calculated
        />
      </CardBody>
    </Card>
  )
}

export default CasesCard
