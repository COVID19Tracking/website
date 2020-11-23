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

import createRaceValues from './cards/crdt/create-race-data'
import CrdtCasesCard from './cards/crdt/cases-card'
import CrdtDeathsCard from './cards/crdt/deaths-card'

import SmallCards from './cards/small-cards'
import GradeSmallCard from './cards/small/grade-small-card'
import ViewDataSmallCard from './cards/small/view-racial-data-small-card'
import DataAsGraphicSmallCard from './cards/small/data-as-graphic-small-card'
import SectionHeader from './cards/section-header'

import summaryStyles from './summary.module.scss'

const StateSummary = ({
  stateSlug,
  stateName,
  stateAbbreviation,
  data,
  sevenDaysAgo,
  metadata,
  longTermCare,
  raceData,
  annotations = false,
  national = false,
}) => {
  /*
  stateSlug: the name of the state, as a slug. like "arizona"
  data: API data from either usCovid or covidState
  sevenDaysAgo: seven day old API data from usCovidDaily or covidStateDaily
  national: flag for the national summary, true means this is national
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

  const raceValues = createRaceValues(raceData)

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
            annotations={annotations
              .filter(annotation => {
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
              })
              .sort((a, b) =>
                cardAnnotations.indexOf(a.field[0]) >
                cardAnnotations.indexOf(b.field[0])
                  ? 1
                  : -1,
              )}
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
            stateName={stateName}
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
                stateName={stateName}
                totalTestEncountersViral={data.totalTestEncountersViral}
                totalTestsViral={data.totalTestsViral}
                totalTestsPeopleViral={data.totalTestsPeopleViral}
                unknownUnits={metadata && metadata.testUnitsUnknown}
              />
              <TestsAntibodyCard
                stateSlug={stateSlug}
                stateName={stateName}
                totalTestsAntibody={data.totalTestsAntibody}
              />
            </>
          )}
          <HospitalizationCard
            stateSlug={stateSlug}
            stateName={stateName}
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
            stateName={stateName}
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
              stateName={stateName}
              stateDeaths={data.death}
              stateSlug={stateSlug}
            />
          )}
          {!national && (
            <>
              <SectionHeader title="Race & ethnicity data" />
              <SmallCards>
                <GradeSmallCard grade={data.dataQualityGrade} />
                <ViewDataSmallCard stateAbbreviation={stateAbbreviation} />
                <DataAsGraphicSmallCard stateAbbreviation={stateAbbreviation} />
              </SmallCards>
              <CrdtCasesCard
                raceData={raceValues}
                stateAbbreviation={stateAbbreviation}
              />
              <CrdtDeathsCard
                raceData={raceValues}
                stateAbbreviation={stateAbbreviation}
              />
            </>
          )}
        </div>
      </AnnotationPanelContext.Provider>
    </DefinitionPanelContext.Provider>
  )
}

export default StateSummary
