import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  DefinitionPanel,
  DefinitionPanelContext,
} from './cards/definitions-panel'

import CasesCard from './cards/cases-card'
import CumulativeHospitalizationCard from './cards/cumulative-hospitalization-card'
import CurrentHospitalizationCard from './cards/current-hospitalization-card'
import OutcomesCard from './cards/outcomes-card'
import RaceEthnicityCard from './cards/race-ethnicity-card'
import { PCRTestsCard, TestsCard } from './cards/tests-cards'

import summaryStyles from './summary.module.scss'

export default ({
  stateSlug,
  data,
  raceData,
  sevenDaysAgo,
  national = false,
}) => {
  /*
  stateSlug: the name of the state, as a slug. like "arizona"
  data: API data from either usCovid or covidState
  raceData: tbd, currently like {combined: bool, separate: bool}
  sevenDaysAgo: seven day old API data from usCovidDaily or covidStateDaily
  national: flag for the national summmary, true means this is national
  */
  const [cardDefinitions, setCardDefinitions] = useState(false)
  const [highlightedDefinition, setHighlightedDefinition] = useState(false)
  const { allContentfulDataDefinition } = useStaticQuery(graphql`
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

  const apiDefinitions = allContentfulDataDefinition.nodes

  const definitions =
    cardDefinitions &&
    cardDefinitions.map(def => ({
      ...apiDefinitions.find(d => d.fieldName === def && d),
      ...def,
    }))

  return (
    <DefinitionPanelContext.Provider
      value={({ fields, highlight }) => {
        setCardDefinitions(fields)
        setHighlightedDefinition(highlight)
      }}
    >
      {cardDefinitions && (
        <DefinitionPanel
          definitions={definitions}
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
        {!national && (
          <PCRTestsCard
            stateSlug={stateSlug}
            totalTestsViral={data.totalTestsViral}
            positiveTestsViral={data.positiveTestsViral}
            negativeTestsViral={data.negativeTestsViral}
          />
        )}
        {!national && (
          <CumulativeHospitalizationCard
            stateSlug={stateSlug}
            hospitalizedCumulative={data.hospitalizedCumulative}
            inIcuCumulative={data.inIcuCumulative}
            onVentilatorCumulative={data.onVentilatorCumulative}
          />
        )}
        <OutcomesCard
          stateSlug={stateSlug}
          deathsLabel={deathsLabel}
          death={data.death}
          deathConfirmed={data.deathConfirmed}
          deathProbable={data.deathProbable}
          recovered={data.recovered}
        />
        {!national && (
          <RaceEthnicityCard stateSlug={stateSlug} raceData={raceData} />
        )}
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
