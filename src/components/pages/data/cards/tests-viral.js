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
  totalTestEncountersViral,
  totalTestsViral,
  totalTestsPeopleViral,
  unknownUnits = false,
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
  const { setCardAnnotations } = useContext(AnnotationPanelContext)

  return (
    <Card
      title="Viral (PCR) tests"
      link={
        <Link to={`/data/state/${stateSlug}/tests-viral`}>
          Historical data{' '}
          <span className="a11y-only"> for viral (PCR) tests</span>
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
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'totalTestsViral',
                })
              }}
              label="Total tests (unclear units)"
            />

            <AnnotationButton field="Total Tests (PCR)">
              <DefinitionLink
                title="Warning"
                onDefinitionsToggle={() => {
                  setCardAnnotations({
                    fields: annotationFields,
                    highlight: 'Total Tests (PCR)',
                  })
                }}
                label="Annotation for Total Tests (in unclear units)"
              />
            </AnnotationButton>
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
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestEncountersViral',
                  })
                }}
                label="Total tests (test encounters)"
              />
              {}
              <AnnotationButton field="Total Test Encounters (PCR)">
                <DefinitionLink
                  title="Warning"
                  onDefinitionsToggle={() => {
                    setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total Test Encounters (PCR)',
                    })
                  }}
                  label="Annotation for total cases"
                />
              </AnnotationButton>
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
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsViral',
                  })
                }}
                label="Total tests (specimens)"
              />
              <AnnotationButton field="Total Tests (PCR)">
                <DefinitionLink
                  title="Warning"
                  onDefinitionsToggle={() => {
                    setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total Tests (PCR)',
                    })
                  }}
                  label="Annotation for Total Tests (PCR)"
                />
              </AnnotationButton>
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
              <DefinitionLink
                onDefinitionsToggle={() => {
                  definitionContext({
                    fields,
                    highlight: 'totalTestsPeopleViral',
                  })
                }}
                label="Total tests (people)"
              />
              <AnnotationButton field="Total PCR Tests (People)">
                <DefinitionLink
                  title="Warning"
                  onDefinitionsToggle={() => {
                    setCardAnnotations({
                      fields: annotationFields,
                      highlight: 'Total PCR Tests (People)',
                    })
                  }}
                  label="Annotation for Total PCR Tests (People)"
                />
              </AnnotationButton>
            </Statistic>
          </>
        )}
      </CardBody>
    </Card>
  )
}

export default TestsViralCard
