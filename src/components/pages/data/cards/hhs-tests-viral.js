import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardNote, CardBody } from '~components/common/card'
import { Statistic, DefinitionLink } from '~components/common/statistic'
import { AnnotationPanelContext } from './definitions-panel'
import LastUpdatedLabel from './last-updated-label'

const TestsHHSViralcard = ({ hhsTesting, notes }) => {
  const annotationContext = useContext(AnnotationPanelContext)
  return (
    <Card title="Viral (PCR) tests (HHS data)">
      <CardBody>
        <Statistic title="Total tests" value={hhsTesting.total} />
        {notes.notes && (
          <DefinitionLink
            onDefinitionsToggle={() => {
              annotationContext.setCardAnnotations({
                fields: ['Viral (PCR) tests (HHS data)'],
                highlight: 'Viral (PCR) tests (HHS data)',
              })
            }}
            title="Warning"
          />
        )}
        {notes.sourceNotes && (
          <CardNote>
            <strong>Source:</strong> {notes.sourceNotes}
          </CardNote>
        )}
        <CardNote>
          This data is{' '}
          <a href="https://healthdata.gov/dataset/covid-19-diagnostic-laboratory-testing-pcr-testing-time-series">
            published by HHS
          </a>
          . It{' '}
          <Link to="/analysis-updates/federal-testing-datas-last-mile">
            may differ from state-provided data
          </Link>
          .
        </CardNote>
        <LastUpdatedLabel date={hhsTesting.date} />
      </CardBody>
    </Card>
  )
}

export default TestsHHSViralcard
