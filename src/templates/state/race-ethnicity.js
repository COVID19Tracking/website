import React from 'react'

import Layout from '~components/layout'

export default ({ pageContext, path }) => {
  const state = pageContext
  return (
    <Layout
      title={state.name}
      returnLinkTitle={state.name}
      returnLink={`/data/state/${state.slug}`}
      path={path}
    >
      <p>Race ethnicity</p>
    </Layout>
  )
}
