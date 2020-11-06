import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import {
  DefinitionPanel,
  DefinitionPanelContext,
  AnnotationPanelContext,
} from './cards/definitions-panel'

import CasesCard from './cards/cases-card'
import HospitalizationCard from './cards/hospitalization-card'
import OutcomesCard from './cards/outcomes-card'
import TestsAntibodyCard from './cards/tests-antibody'
import TestsViralCard from './cards/tests-viral'
import NationalTestsCard from './cards/tests-national'
import LongTermCareCard from './cards/long-term-care'

import summaryStyles from './summary.module.scss'

const StateSummary = ({
  stateSlug,
  stateName,
  data,
  sevenDaysAgo,
  metadata,
  longTermCare,
  annotations = false,
  national = false,
}) => {
  /*
  stateSlug: the name of the state, as a slug. like "arizona"
  data: API data from either usCovid or covidState
  sevenDaysAgo: seven day old API data from usCovidDaily or covidStateDaily
  national: flag for the national summmary, true means this is national
  */
  const [cardDefinitions, setCardDefinitions] = useState(false)
  const [highlightedDefinition, setHighlightedDefinition] = useState(false)
  const [cardAnnotations, setCardAnnotations] = useState(false)
  const [highlightedAnnotation, setHighlightedAnnotation] = useState(false)
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
        setCardAnnotations(false)
      }}
    >
      <AnnotationPanelContext.Provider
        value={{
          annotations,
          setCardAnnotations: ({ fields, highlight }) => {
            setCardAnnotations(fields)
            setHighlightedAnnotation(highlight)
            setCardDefinitions(false)
          },
        }}
      >
        {cardDefinitions && (
          <DefinitionPanel
            definitions={definitions}
            highlightedDefinition={highlightedDefinition}
            onHide={() => setCardDefinitions(false)}
            title="Definitions"
          />
        )}
        {cardAnnotations && (
          <DefinitionPanel
            annotations={annotations.filter(annotation => {
              let result = false
              cardAnnotations.forEach(cardAnnotation => {
                if (
                  annotation.field &&
                  annotation.field.indexOf(cardAnnotation) > -1
                ) {
                  result = true
                }
              })
              return result
            })}
            highlightedDefinition={highlightedAnnotation}
            onHide={() => setCardAnnotations(false)}
            title={`${stateName} Annotations & Warnings`}
          />
        )}
        <div
          className={classnames(
            summaryStyles.container,
            national && summaryStyles.fullWidth,
          )}
        >
          <CasesCard
            stateSlug={stateSlug}
            positive={data.positive}
            positiveIncrease={data.positiveIncrease}
            probableCases={data.probableCases}
            confirmedCases={data.positiveCasesViral}
            sevenDayIncrease={sevenDayPositiveIncrease}
            national={national}
          />
          {national && (
            <NationalTestsCard
              totalTestResults={data.totalTestResults}
              totalTestResultsIncrease={data.totalTestResultsIncrease}
              totalTestResulstPercentIncrease={
                (data.totalTestResults - sevenDaysAgo.totalTestResults) /
                sevenDaysAgo.totalTestResults
              }
            />
          )}
          {!national && (
            <>
              <TestsViralCard
                stateSlug={stateSlug}
                totalTestEncountersViral={data.totalTestEncountersViral}
                totalTestsViral={data.totalTestsViral}
                totalTestsPeopleViral={data.totalTestsPeopleViral}
                unknownUnits={metadata && metadata.testUnitsUnknown}
              />
              <TestsAntibodyCard
                stateSlug={stateSlug}
                totalTestsAntibody={data.totalTestsAntibody}
              />
            </>
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
          {!national && (
            <LongTermCareCard
              data={longTermCare}
              stateDeaths={data.death}
              stateSlug={stateSlug}
            />
          )}
        </div>
      </AnnotationPanelContext.Provider>
    </DefinitionPanelContext.Provider>
  )
}

export default StateSummary
