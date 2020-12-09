import React from 'react'
import Layout from '~components/layout'
import HHSFacilitiesList from '~components/pages/data/hhs-facilities/list'

const StateHHSHospitalization = ({ pageContext, path }) => {
  const state = pageContext
  const { slug } = state.childSlug
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
      <HHSFacilitiesList />
    </Layout>
  )
}

export default StateHHSHospitalization
