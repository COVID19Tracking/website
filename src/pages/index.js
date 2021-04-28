import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '~components/utils/skip-navigation'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'
import Footer from '~components/layout/footer'
import HomepageImpact from '~components/pages/homepage/impact'
import HomepageContent from '~components/pages/homepage/content'

const Homepage = () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <HomepageContent />
      <HomepageImpact />
    </main>
    <Footer noMargin hideAbout />
  </>
)

export default Homepage
