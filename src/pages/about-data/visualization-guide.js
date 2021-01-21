import React from 'react'
import Layout from '~components/layout'
import VisualizationGuide from '~components/pages/about-data/visualization-guide'

const VisualizationGuidePage = () => {
  return (
    <Layout
      title="Visualization Guide"
      description="Explore graphics made with the COVID Tracking Project dataset along with tips to help you present the data in the clearest and most accurate way possible."
      path="/about-data/visualization-guide"
    >
      <VisualizationGuide />
    </Layout>
  )
}

export default VisualizationGuidePage
