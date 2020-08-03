/* eslint-disable no-unused-vars */
import React from 'react'
import RaceSocialCards from '~components/social-cards/race/state'
import SocialCardsSelect from '~components/pages/race/social-cards/select'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout
    title="Social cards"
    returnLink="/race"
    returnLinkTitle="Racial Data Tracker"
    path="/race/social-cards"
    centered
  >
    <p>Help spread awareness of racial disparity in COVID-19 pandemic.</p>
    <RaceSocialCards />
    <SocialCardsSelect />
  </Layout>
)
