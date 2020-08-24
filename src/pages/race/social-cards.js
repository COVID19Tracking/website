/* eslint-disable no-unused-vars */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '~components/layout'
import SocialSharing from '~components/common/social-sharing'
import RaceSocialCards from '~components/social-cards/race/state'
import SocialCardsSelect from '~components/pages/race/social-cards/select'

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
      title="Social Cards"
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
      Click to share on social media
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        url="google.com"
        text="woohoo sharing"
        outlineOnly
      />
      {/*
      todo update the url and text

      the url can be configured as a page like /race/dashboard/california
      (that has the custom social card), which could then redirect to
      /race/dashboard#state-ca.

      */}
      <RaceSocialCards />
      <SocialCardsSelect />
    </Layout>
  )
}
