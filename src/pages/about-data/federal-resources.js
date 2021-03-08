import React from 'react'
import DataSummary from '~components/pages/about-data/data-summary'
import Layout from '~components/layout'

const FederalResourcesPage = () => (
  <Layout title="Federal Resources" centered>
    <DataSummary resources />
  </Layout>
)

export default FederalResourcesPage
