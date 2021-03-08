import React from 'react'
import FederalResources from '~components/pages/about-data/federal-resources'
import FederalTrackers from '~components/pages/about-data/federal-trackers'
import Layout from '~components/layout'

const FederalResourcesPage = () => (
  <Layout title="Federal Resources" centered>
    <FederalResources />
    <FederalTrackers />
  </Layout>
)

export default FederalResourcesPage
