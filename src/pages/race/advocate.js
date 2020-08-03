import React from 'react'
import Layout from '~components/layout'
import Container from '~components/common/container'
import AdvocacyForm from '~components/pages/race/advocate/advocacy-form'

export default () => {
  return (
    <Layout
      title="Help Us Get Better Race and Ethnicity Data"
      returnLink="/race"
      path="/race/advocate"
    >
      <Container narrow centered>
        <AdvocacyForm />
      </Container>
    </Layout>
  )
}
