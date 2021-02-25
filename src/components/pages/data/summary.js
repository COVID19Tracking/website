import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import {
  DefinitionPanel,
  DefinitionPanelContext,
  AnnotationPanelContext,
} from './cards/definitions-panel'

import DetailText from '~components/common/detail-text'
import Container from '~components/common/container'
import CasesCard from './cards/cases-card'
import HospitalizationCard from './cards/hospitalization-card'
import OutcomesCard from './cards/outcomes-card'
import TestsAntibodyCard from './cards/tests-antibody'
import TestsHHSViralcard from './cards/hhs-tests-viral'
import TestsAntigenCard from './cards/tests-antigen'
import TestsViralCard from './cards/tests-viral'
import NationalTestsCard from './cards/tests-national'
import LongTermCareCard from './cards/long-term-care'
import HospitalizationHhsCard from './cards/hospitalization-hhs-card'
import LongTermCareVaccinationsCard from './cards/long-term-care-vaccinations'
import createRaceValues from './cards/crdt/create-race-data'
import CrdtCasesCard from './cards/crdt/cases-card'
import CrdtDeathsCard from './cards/crdt/deaths-card'
import SmallCards from './cards/small-cards'
import ViewDataSmallCard from './cards/small/view-racial-data-small-card'
import DataAsGraphicSmallCard from './cards/small/data-as-graphic-small-card'
import HistoricalRaceDataSmallCard from './cards/small/historical-race-data'

import summaryStyles from './summary.module.scss'

const NationalText = ({ footnote }) => {
  return (
    <Container narrow>
      <DetailText>
        <div
          dangerouslySetInnerHTML={{
            __html: footnote.content.childMarkdownRemark.html,
          }}
        />
      </DetailText>
    </Container>
  )
}

const StateSummary = ({
  stateSlug,
  stateName,
  stateAbbreviation,
  data,
  sevenDaysAgo,
  metadata,
  longTermCare,
  raceData,
  hhsHospitalization,
  ltcFedVaccinations,
  hhsTesting,
  hhsTestingNotes,
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
  const {
    allContentfulDataDefinition,
    nationalSummaryFootnote,
    hhsTestingConfig,
  } = useStaticQuery(graphql`
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
      nationalSummaryFootnote: contentfulSnippet(
        slug: { eq: "national-summary-footnote" }
      ) {
        content {
          childMarkdownRemark {
            html
          }
        }
      }

      hhsTestingConfig(description: { eq: "Community Profile Report" }) {
        file
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

  // states that should be ignored for racial data *graphic* links
  const racialDataGraphicIgnoreStates = ['AS', 'GU', 'MP', 'VI']

  // true means we should hide this small card
  const hideRacialDataGraphic =
    racialDataGraphicIgnoreStates.indexOf(stateAbbreviation) > -1

  // states that should be ignored for historical racial data links
  const racialDataHistoricalIgnoreStates = ['AS', 'MP', 'VI']

  const hideRacialDataHistorical =
    racialDataHistoricalIgnoreStates.indexOf(stateAbbreviation) > -1

  // states that should be ignored for racial data *tracker* links
  const racialDataTrackerIgnoreStates = ['MP', 'AS']

  // true means we should hide this small card
  const hideRacialDataTracker =
    racialDataTrackerIgnoreStates.indexOf(stateAbbreviation) > -1

  // true means we should hide all small cards
  const hideSmallCards = hideRacialDataGraphic && hideRacialDataTracker

  const raceValues = createRaceValues(raceData)

  const addMetricTextDefinitions = (allDefinitions, allAnnotations) => {
    /**
     * Adds definitions from Airtable stored in the metricText variable to the
     * definitions already in the allDefinitions array from Contentful.
     */
    if (!allDefinitions) {
      return allDefinitions
    }

    let isOutcomes = false

    allDefinitions.every(definition => {
      if (definition.fieldName === 'death') {
        isOutcomes = true
        return false
      }
      return true
    })

    if (!isOutcomes) {
      return allDefinitions
    }

    allAnnotations.forEach(annotation => {
      if (annotation.metricText != null) {
        const definitionShim = {
          childContentfulDataDefinitionDefinitionTextNode: {
            childMarkdownRemark: {
              html: annotation.metricText,
            },
          },
          fieldName: annotation.field.toLowerCase(),
          name: annotation.metricTitle,
        }
        allDefinitions.unshift(definitionShim)
      }
    })

    return allDefinitions
  }

  if (annotations !== false) {
    addMetricTextDefinitions(definitions, annotations)
  }
  if (
    hhsTestingNotes &&
    hhsTestingNotes.notes &&
    !annotations.find(
      annotation => annotation.field === 'Viral (PCR) tests (HHS data)',
    )
  ) {
    annotations.push({
      field: 'Viral (PCR) tests (HHS data)',
      warning: (
        <>
          <p>{hhsTestingNotes.notes}</p>
          <p>
            Sourced from the{' '}
            <a href={hhsTestingConfig.file}>Community Profile Report</a>.
          </p>
        </>
      ),
    })
  }

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
            title={
              stateName === undefined
                ? 'National Definitions'
                : `${stateName} Definitions`
            }
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
        <div className={summaryStyles.wrapper}>
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
                  annotations={annotations}
                />
                {hhsTesting && (
                  <TestsHHSViralcard
                    stateSlug={stateSlug}
                    stateName={stateName}
                    hhsTesting={hhsTesting}
                    notes={hhsTestingNotes}
                  />
                )}
                <TestsAntigenCard
                  stateSlug={stateSlug}
                  stateName={stateName}
                  totalTestsAntigen={data.totalTestsAntigen}
                  totalTestsPeopleAntigen={data.totalTestsPeopleAntigen}
                />
                <TestsAntibodyCard
                  stateSlug={stateSlug}
                  stateName={stateName}
                  totalTestsAntibody={data.totalTestsAntibody}
                  totalTestsPeopleAntibody={data.totalTestsPeopleAntibody}
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
            {!national && hhsHospitalization && (
              <HospitalizationHhsCard
                hhsHospitalization={hhsHospitalization}
                stateAbbreviation={stateAbbreviation}
              />
            )}
            <OutcomesCard
              stateSlug={stateSlug}
              stateName={stateName}
              deathsLabel={deathsLabel}
              death={data.death}
              deathConfirmed={data.deathConfirmed}
              hospitalizedDischarged={data.hospitalizedDischarged}
              deathProbable={data.deathProbable}
              national={national}
            />
          </div>
          {national && <NationalText footnote={nationalSummaryFootnote} />}
        </div>
        {!national && (
          <>
            <h4>Long-term-care facilities</h4>
            <div className={summaryStyles.container}>
              <LongTermCareCard
                data={longTermCare}
                stateName={stateName}
                stateDeaths={data.death}
                stateSlug={stateSlug}
              />
              {ltcFedVaccinations && (
                <LongTermCareVaccinationsCard
                  ltcFedVaccinations={ltcFedVaccinations}
                />
              )}
            </div>
          </>
        )}
        {!national && (
          <>
            <h4>Race &amp; ethnicity data</h4>
            <p>
              We compute the number of{' '}
              <strong>cases and deaths per 100k people</strong> for each race
              and ethnicity.
            </p>
            <p>
              These numbers show the scale of outcomes compared to the size of
              each group’s population.{' '}
              <strong>These are not the number of cases or deaths</strong>,
              rather the proportion of each demographic group who have been
              affected.
            </p>
            <div className={summaryStyles.container}>
              {!hideSmallCards && (
                <>
                  <SmallCards>
                    {!hideRacialDataTracker && (
                      <ViewDataSmallCard
                        stateName={stateName}
                        stateAbbreviation={stateAbbreviation}
                      />
                    )}
                    <DataAsGraphicSmallCard
                      stateName={stateName}
                      stateAbbreviation={stateAbbreviation}
                    />
                    {!hideRacialDataHistorical && (
                      <HistoricalRaceDataSmallCard
                        stateAbbreviation={stateAbbreviation}
                        stateSlug={stateSlug}
                      />
                    )}
                  </SmallCards>
                </>
              )}
              <CrdtCasesCard
                raceData={raceValues}
                stateAbbreviation={stateAbbreviation}
              />
              <CrdtDeathsCard
                raceData={raceValues}
                stateAbbreviation={stateAbbreviation}
              />
            </div>
          </>
        )}
      </AnnotationPanelContext.Provider>
    </DefinitionPanelContext.Provider>
  )
}

export default StateSummary
