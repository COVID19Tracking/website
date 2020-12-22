import React from 'react'
import Layout from '~components/layout'
import HHSFacilitiesSearch from '~components/pages/data/hhs-facilities/search'

const HHSHospitalizationSearch = () => {
  return (
    <Layout
      title="Hospital facilities"
      returnLinks={[{ link: '/data' }]}
      path="/data/hospital-facilities"
      showWarning
    >
      <HHSFacilitiesSearch center={[-97, 38]} zoom={4} />
    </Layout>
  )
}

export default HHSHospitalizationSearch
