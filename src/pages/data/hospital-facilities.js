import React from 'react'
import Layout from '~components/layout'
import HHSFacilitiesList from '~components/pages/data/hhs-facilities/list'

const StateHHSHospitalization = () => {
  return (
    <Layout
      title="Hospital facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      showWarning
    >
      <HHSFacilitiesList />
    </Layout>
  )
}

export default StateHHSHospitalization
