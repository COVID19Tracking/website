import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DefinitionPanel, DefinitionPanelContext } from './definitions-panel'
import CasesCard from './state-cards/cases-card'
import {
  PCRTestsCard,
  TestsCard,
  CumulativeHospitalizationCard,
  CurrentHospitalizationCard,
  RaceEthnicityCard,
  OutcomesCard,
} from './state-cards'

import summaryStyles from './summary.module.scss'

export default ({ stateSlug, data, raceData, sevenDaysAgo }) => {
  const [cardDefinitions, setCardDefinitions] = useState(false)
  const [highlightedDefinition, setHighlightedDefinition] = useState(false)
  const definitions = useStaticQuery(graphql`
    {
      allContentfulDataDefinition {
        nodes {
          name
          fieldName
          childContentfulDataDefinitionDefinitionTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  `)
  const deathsLabel =
    data.deathProbable || data.deathConfirmed ? 'Total deaths' : 'Deaths'
  const sevenDayPositiveIncrease =
    (data.positive - sevenDaysAgo.positive) / sevenDaysAgo.positive

  return (
    <DefinitionPanelContext.Provider
      value={({ fields, highlight }) => {
        setCardDefinitions(fields)
        setHighlightedDefinition(highlight)
      }}
    >
      {cardDefinitions && (
        <DefinitionPanel
          definitions={definitions.allContentfulDataDefinition.nodes.filter(
            definition => cardDefinitions.indexOf(definition.fieldName) > -1,
          )}
          highlightedDefinition={highlightedDefinition}
          onHide={() => setCardDefinitions(false)}
        />
      )}
      <div className={summaryStyles.container}>
        <CasesCard
          stateSlug={stateSlug}
          positive={data.positive}
          positiveIncrease={data.positiveIncrease}
          sevenDayIncrease={sevenDayPositiveIncrease}
        />
        <TestsCard
          stateSlug={stateSlug}
          negative={data.negative}
          positive={data.positive}
          pending={data.pending}
          totalTestResults={data.totalTestResults}
        />
        <PCRTestsCard
          stateSlug={stateSlug}
          totalTestsViral={data.totalTestsViral}
          positiveTestsViral={data.positiveTestsViral}
          negativeTestsViral={data.negativeTestsViral}
        />
        <CumulativeHospitalizationCard
          stateSlug={stateSlug}
          hospitalizedCumulative={data.hospitalizedCumulative}
          inIcuCumulative={data.inIcuCumulative}
          onVentilatorCumulative={data.onVentilatorCumulative}
        />
        <OutcomesCard
          stateSlug={stateSlug}
          deathsLabel={deathsLabel}
          death={data.death}
          deathConfirmed={data.deathConfirmed}
          deathProbable={data.deathProbable}
          recovered={data.recovered}
        />
        <RaceEthnicityCard stateSlug={stateSlug} raceData={raceData} />
        <CurrentHospitalizationCard
          stateSlug={stateSlug}
          hospitalizedCurrently={data.hospitalizedCurrently}
          inIcuCurrently={data.inIcuCurrently}
          onVentilatorCurrently={data.onVentilatorCurrently}
        />
      </div>
    </DefinitionPanelContext.Provider>
  )
}
