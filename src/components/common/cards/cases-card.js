import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import {
  DrillDown,
  Statistic,
  DefinitionLink,
} from '~components/common/statistic'

export default ({
  stateSlug,
  positive,
  positiveIncrease,
  sevenDayIncrease,
  national,
}) => {
  const sevenDayIncreasePercent = Math.round(sevenDayIncrease * 100 * 10) / 10
  const drillDownValue = Number.isNaN(sevenDayIncreasePercent)
    ? 'N/A'
    : sevenDayIncreasePercent
  const drillDownSuffix = Number.isNaN(sevenDayIncreasePercent) ? '' : '%'
  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title="Cases"
      link={
        <Link
          to={
            national ? '/data/national/cases' : `/data/state/${stateSlug}/cases`
          }
        >
          Historical data
        </Link>
      }
    >
      <CardBody>
        <Statistic title="Total cases" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: ['positive'],
                highlight: 'positive',
              })
            }}
          />
          <DrillDown label="New cases" value={positiveIncrease} calculated />
          <DrillDown
            label="Increase in 7 days"
            value={drillDownValue}
            suffix={drillDownSuffix}
            calculated
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}
