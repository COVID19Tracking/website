import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import {
  DefinitionPanelContext,
  AnnotationPanelContext,
  AnnotationButton,
} from './definitions-panel'
import { Statistic, DefinitionLink } from '~components/common/statistic'

const TestsViralCard = ({
  stateSlug,
  stateName,
  totalTestEncountersViral,
  totalTestsViral,
  totalTestsPeopleViral,
  unknownUnits = false,
  annotations,
}) => {
  const definitionContext = useContext(DefinitionPanelContext)
  const fields = [
    'totalTestEncountersViral',
    'totalTestsViral',
    'totalTestsPeopleViral',
  ]
  const annotationFields = [
    'Total Test Encounters (PCR)',
    'Total Tests (PCR)',
    'Total PCR Tests (People)',
  ]
  const annotationContext = useContext(AnnotationPanelContext)

  const getWarningTitle = (annotationsList, annotationField) => {
    let fieldName = 'Warning'
    if (!annotationsList) {
      return fieldName
    }
    annotationsList.every(annotation => {
      if (annotation.field === annotationField) {
        fieldName = annotation.warningTitle
        return false
      }
      return true
    })
    return fieldName
  }

  return (
    <Card
      title="Viral (PCR) tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-viral`}>
          <span className="a11y-only">{stateName} viral (PCR) testing </span>
          Historical data{' '}
        </Link>
      }
    >
      <CardBody>
        {unknownUnits ? (
          <Statistic
            title={
              <>
                Total tests
                <br />
                (in unclear units)
              </>
            }
            value={totalTestsViral}
          >
            <AnnotationButton field="Total Tests (PCR)">
              <DefinitionLink
                title={getWarningTitle(annotations, 'Total Tests (PCR)')}
                onDefinitionsToggle={() => {
                  annotationContext.setCardAnnotations({
                    fields: annotationFields,
                    highlight: 'Total Tests (PCR)',
                  })
                }}
                label="Annotation for Total Tests (in unclear units)"
              />
            </AnnotationButton>
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'totalTestsViral',
                })
              }}
              label="Total tests (unclear units)"
            />
          </Statistic>
        ) : (
          <>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in test encounters)
                </>
              }
              value={totalTestEncountersViral}
            >
              <AnnotationButton field="Total Test Encounters (PCR)">
                <DefinitionLink
                  title={getWarningTitle(
                    annotations,
                    'Total Test Encounters (PCR)',
                  )}
                  onDefinitionsToggle={() => {
                    annotationContext.setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total Test Encounters (PCR)',
                    })
                  }}
                  label="Annotation for total cases"
                />
              </AnnotationButton>
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestEncountersViral',
                  })
                }}
                label="Total tests (test encounters)"
              />
            </Statistic>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in specimens)
                </>
              }
              value={totalTestsViral}
            >
              <AnnotationButton field="Total Tests (PCR)">
                <DefinitionLink
                  title={getWarningTitle(annotations, 'Total Tests (PCR)')}
                  onDefinitionsToggle={() => {
                    annotationContext.setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total Tests (PCR)',
                    })
                  }}
                  label="Annotation for Total Tests (PCR)"
                />
              </AnnotationButton>
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsViral',
                  })
                }}
                label="Total tests (specimens)"
              />{' '}
            </Statistic>
            <Statistic
              title={
                <>
                  Total tests
                  <br />
                  (in people)
                </>
              }
              value={totalTestsPeopleViral}
            >
              <AnnotationButton field="Total PCR Tests (People)">
                <DefinitionLink
                  title={getWarningTitle(
                    annotations,
                    'Total PCR Tests (People)',
                  )}
                  onDefinitionsToggle={() => {
                    annotationContext.setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total PCR Tests (People)',
                    })
                  }}
                  label="Annotation for Total PCR Tests (People)"
                />
              </AnnotationButton>
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsPeopleViral',
                  })
                }}
                label="Total tests (people)"
              />
            </Statistic>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default TestsViralCard
