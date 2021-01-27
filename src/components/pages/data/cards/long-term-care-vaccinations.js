import React from 'react'
import { Card, CardBody, CardNote } from '~components/common/card'
import { Statistic } from '~components/common/statistic'

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
        Vaccinations administered through the Pharmacy Partnership for Long-Term
        Care Program
      </CardNote>
    </CardBody>
  </Card>
)

export default LongTermCareVaccinations
