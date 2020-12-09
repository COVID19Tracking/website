import React from 'react'
import Layout from '~components/layout'
import HHSFacilitiesList from '~components/pages/data/hhs-facilities/list'
import HHSFacilitiesMap from '~components/pages/data/hhs-facilities/map'
import stateCenters from '~data/visualization/state-centers.json'

const StateHHSHospitalization = ({ pageContext, path }) => {
  const state = pageContext
  const { slug } = state.childSlug
  const center = stateCenters.find(({ name }) => name === state.name)
  return (
    <Layout
      title={`${state.name}: Hospital facilities`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
      showWarning
    >
      <HHSFacilitiesMap
        center={center ? [center.lon, center.lat] : [-97, 38]}
        zoom={center ? center.zoom : 4}
        state={state.state}
      />
      <HHSFacilitiesList state={pageContext.state} />
    </Layout>
  )
}

export default StateHHSHospitalization
