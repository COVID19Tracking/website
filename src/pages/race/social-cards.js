/* eslint-disable no-unused-vars */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import RaceSocialCards from '~components/social-cards/race/state'
import SocialCardsSelect from '~components/pages/race/social-cards/select'
import Layout from '~components/layout'

export default ({ data }) => {
  const { contentfulSnippet } = useStaticQuery(graphql`
    query {
      contentfulSnippet(slug: { eq: "crdt-social-cards-preamble" }) {
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  // todo use two return links once #1317 is merged
  // return to racial data dashboard and racial data tracker
  return (
    <Layout
      title="Social cards"
      returnLink="/race"
      returnLinkTitle="Racial Data Tracker"
      path="/race/social-cards"
      centered
    >
      <div
        dangerouslySetInnerHTML={{
          __html: contentfulSnippet.content.childMarkdownRemark.html,
        }}
      />
      <RaceSocialCards />
      <SocialCardsSelect />
    </Layout>
  )
}
