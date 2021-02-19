import React, { useContext } from 'react'
import { Card, CardNote, CardBody } from '~components/common/card'
import { Statistic, DefinitionLink } from '~components/common/statistic'
import { AnnotationPanelContext, AnnotationButton } from './definitions-panel'
import LastUpdatedLabel from './last-updated-label'

const TestsHHSViralcard = ({ hhsTesting, notes }) => {
  const annotationContext = useContext(AnnotationPanelContext)
  return (
    <Card title="Viral (PCR) tests (HHS data)">
      <CardBody>
        <Statistic title="Total tests" value={hhsTesting.total} />
        <Statistic title="Positive tests" value={hhsTesting.positive} />
        {notes.notes && (
          <AnnotationButton field="Total Tests (PCR)">
            <DefinitionLink
              onDefinitionsToggle={() => {
                annotationContext.setCardAnnotations({
                  fields: ['Viral (PCR) tests (HHS data)'],
                  highlight: 'Viral (PCR) tests (HHS data)',
                })
              }}
              title="Warning"
            />
          </AnnotationButton>
        )}
        {notes.sourceNotes && (
          <CardNote>
            <strong>Source:</strong> {notes.sourceNotes}
          </CardNote>
        )}
        <CardNote>
          This data is{' '}
          <a href="https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-state">
            published by HHS
          </a>
          .
        </CardNote>
        <LastUpdatedLabel date={hhsTesting.date} />
      </CardBody>
    </Card>
  )
}

export default TestsHHSViralcard
