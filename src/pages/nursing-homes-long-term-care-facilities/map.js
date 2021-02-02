import React from 'react'
import Layout from '~components/layout'
import LTCMap from '~components/pages/data/long-term-care/map'
import Container from '~components/common/container'

const LTCContactPage = () => (
  <Layout title="Long term care: Facility map" noContainer>
    <Container centered>This is a piece of content above the map!</Container>
    <LTCMap center={[-97, 38]} zoom={3.5} />
  </Layout>
)

export default LTCContactPage
