import React from 'react'
import DataSummary from '~components/pages/about-data/data-summary'
import FederalTrackers from '~components/pages/about-data/federal-trackers'
import Layout from '~components/layout'

const FederalResourcesPage = () => (
  <Layout title="Federal Resources" centered>
    <DataSummary resources />
    <FederalTrackers />
  </Layout>
)

export default FederalResourcesPage
