import React from 'react'
import { Card, CardNote, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const TestsHHSViralcard = ({ hhsTesting }) => {
  return (
    <Card title="Viral (PCR) tests (HHS data)">
      <CardBody>
        <Statistic title="Total tests" value={hhsTesting.total} />
        <Statistic title="Positive tests" value={hhsTesting.positive} />
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
