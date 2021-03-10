import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '~components/utils/skip-navigation'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'
import Container from '~components/common/container'
import Footer from '~components/layout/footer'
import HomepageAbout from '~components/pages/homepage/about'
import HomepageImpact from '~components/pages/homepage/impact'
import BlogList from '~components/pages/homepage/blog-list'
import { CtaLink } from '~components/common/landing-page/call-to-action'

const Homepage = () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hideWarning />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <HomepageAbout />
      <HomepageImpact />
      <Container>
        <h2>Our analysis &amp; updates</h2>
        <CtaLink bold block extraMargin to="/analysis-updates">
          Read all our posts
        </CtaLink>
        <BlogList />
      </Container>
    </main>
    <Footer noMargin hideAbout />
  </>
)

export default Homepage
