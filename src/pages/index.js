import React from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import Hero from '../components/common/hero'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/pages/homepage/press-list'

export default ({ data }) => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <Hero />
    <main id="main">
      <SkipNavContent />
      <Container>
        <div className="body">
          <div
            dangerouslySetInnerHTML={{
              __html: data.allMarkdownRemark.edges[0].node.html,
            }}
          />
          <h2>In the Press</h2>

          <PressLogos />

          <PressList />
        </div>
      </Container>
    </main>
    <Footer />
  </>
)

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { slug: { eq: "/" }, isPage: { eq: false } } }
    ) {
      edges {
        node {
          id
          html
        }
      }
    }
  }
`
