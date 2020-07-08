import React from 'react'

import Layout from '~components/layout'

export default ({ pageContext, path }) => {
  const state = pageContext
  return (
    <Layout title={state.name} returnLink={`/data/${state.slug}`} path={path}>
      <p>Cases</p>
    </Layout>
  )
}
