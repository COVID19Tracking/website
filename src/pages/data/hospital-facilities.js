import React from 'react'
import Layout from '~components/layout'
import HHSFacilitiesList from '~components/pages/data/hhs-facilities/list'
import HHSFacilitiesMap from '~components/pages/data/hhs-facilities/map'

const StateHHSHospitalization = () => {
  return (
    <Layout
      title="Hospital facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      showWarning
    >
      <HHSFacilitiesMap center={[-97, 38]} zoom={4} />
      <HHSFacilitiesList />
    </Layout>
  )
}

export default StateHHSHospitalization
