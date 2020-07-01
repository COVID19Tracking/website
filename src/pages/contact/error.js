import React from 'react'
import withLocation from '~components/utils/with-location'
import Layout from '~components/layout'

export default withLocation(({ search }) => (
  <Layout title="Sorry" centered>
    <h2>Sorry!</h2>
    <p>There was an error submitting your form, please try again.</p>
    {search.message && <p>{search.message}</p>}
  </Layout>
))
