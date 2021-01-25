import React from 'react'
import { Card, CardBody } from '~components/common/card'
import { Statistic } from '~components/common/statistic'

const LongTermCareVaccinations = ({ ltcFedVaccinations }) => (
  <Card title="Vaccinations">
    <CardBody>
      <Statistic
        title="Administered_Fed_LTC"
        value={ltcFedVaccinations.Administered_Fed_LTC}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose1"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose1}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose1_Residents"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose1_Residents}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose1_Staff"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose1_Staff}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose1_Unk"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose1_Unk}
      />

      <Statistic
        title="Administered_Fed_LTC_Dose2"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose2_Residents"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2_Residents}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose2_Staff"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2_Staff}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose2_Staff"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2_Staff}
      />
      <Statistic
        title="Administered_Fed_LTC_Dose2_Unk"
        value={ltcFedVaccinations.Administered_Fed_LTC_Dose2_Unk}
      />
    </CardBody>
  </Card>
)

export default LongTermCareVaccinations
