import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '~components/utils/skip-navigation'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'
import Footer from '~components/layout/footer'
import Container from '~components/common/container'
import HeaderHero from '~components/pages/homepage/header-hero'
import BlogList from '~components/pages/homepage/blog-list'
import LatestTotals from '~components/pages/homepage/latest-totals'
import Press from '~components/pages/homepage/press'
import HomepageAPI from '~components/pages/homepage/api'
import HomepageAbout from '~components/pages/homepage/about'
import HomepageWhoUses from '~components/pages/homepage/who-uses'

const Homepage = () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin />
    <SkipNavContent />
    <HeaderHero />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <Container>
        <LatestTotals />
      </Container>
      <HomepageAbout />
      <BlogList />
      <Container>
        <HomepageWhoUses />
        <Press />
      </Container>
      <HomepageAPI />
    </main>
    <Footer noMargin />
  </>
)

export default Homepage
