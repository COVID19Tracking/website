import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import {
  DefinitionPanel,
  DefinitionPanelContext,
} from './cards/definitions-panel'

import CasesCard from './cards/cases-card'
import HospitalizationCard from './cards/hospitalization-card'
import OutcomesCard from './cards/outcomes-card'
import { PCRTestsCard, TestsCard } from './cards/tests-cards'
import CRDTCard from './cards/crdt-card'

import summaryStyles from './summary.module.scss'

export default ({
  stateSlug,
  data,
  sevenDaysAgo,
  crdtData,
  population,
  national = false,
  fullWidth = false,
}) => {
  /*
  stateSlug: the name of the state, as a slug. like "arizona"
  data: API data from either usCovid or covidState
  raceData: tbd, currently like {combined: bool, separate: bool}
  sevenDaysAgo: seven day old API data from usCovidDaily or covidStateDaily
  national: flag for the national summmary, true means this is national
  fullWidth: when true, shows 4 columns of cards; shows 3 when false
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
      <div
        className={classnames(
          summaryStyles.container,
          (fullWidth || national) && summaryStyles.fullWidth,
        )}
      >
        <CasesCard
          stateSlug={stateSlug}
          positive={data.positive}
          positiveIncrease={data.positiveIncrease}
          sevenDayIncrease={sevenDayPositiveIncrease}
          national={national}
        />
        <TestsCard
          stateSlug={stateSlug}
          negative={data.negative}
          positive={data.positive}
          pending={data.pending}
          totalTestResults={data.totalTestResults}
          national={national}
        />
        {!national && (
          <PCRTestsCard
            stateSlug={stateSlug}
            totalTestsViral={data.totalTestsViral}
            positiveTestsViral={data.positiveTestsViral}
            negativeTestsViral={data.negativeTestsViral}
          />
        )}
        <HospitalizationCard
          stateSlug={stateSlug}
          hospitalizedCumulative={data.hospitalizedCumulative}
          inIcuCumulative={data.inIcuCumulative}
          onVentilatorCumulative={data.onVentilatorCumulative}
          hospitalizedCurrently={data.hospitalizedCurrently}
          inIcuCurrently={data.inIcuCurrently}
          onVentilatorCurrently={data.onVentilatorCurrently}
          national={national}
        />
        <OutcomesCard
          stateSlug={stateSlug}
          deathsLabel={deathsLabel}
          death={data.death}
          deathConfirmed={data.deathConfirmed}
          deathProbable={data.deathProbable}
          recovered={data.recovered}
          national={national}
        />
      </div>
    </DefinitionPanelContext.Provider>
  )
}
