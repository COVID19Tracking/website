import React from 'react'
import Layout from '~components/layout'

export default ({ pageContext, path }) => {
  const state = pageContext
  const { slug } = state.childSlug
  return (
    <Layout
      title={`${state.name}: Long-term care`}
      returnLinks={[
        { link: '/data' },
        { link: `/data/state/${slug}`, title: state.name },
      ]}
      path={path}
    >
      History!
    </Layout>
  )
}
