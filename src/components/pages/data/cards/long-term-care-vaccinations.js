import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardNote } from '~components/common/card'
import { Statistic } from '~components/common/statistic'
import LastUpdatedLabel from './last-updated-label'

const LongTermCareVaccinations = ({ ltcFedVaccinations }) => (
  <Card title="Vaccinations">
    <CardBody>
      <Statistic
        title="Total resident &amp; staff doses administered"
        value={ltcFedVaccinations.Administered_Fed_LTC}
      />
      <Statistic
        title="Staff &amp; resident 1st dose administered"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose1}
      />

      <Statistic
        title="Staff &amp;resident 2nd dose administered"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2}
      />
      <CardNote>
        Vaccinations administered through the{' '}
        <Link to="https://covidtracking.com/about-data/faq#where-does-your-data-about-vaccinations-in-long-term-care-facilities-come-from">
          Pharmacy Partnership for Long-Term Care Program
        </Link>
      </CardNote>
      <LastUpdatedLabel date={ltcFedVaccinations.Date} />
    </CardBody>
  </Card>
)

export default LongTermCareVaccinations
