import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '../components/utils/skip-navigation'
import Header from '../components/layout/header'
import SEO from '../components/utils/seo'
import Footer from '../components/layout/footer'

export default () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <p>Homepage here</p>
    </main>
    <Footer />
  </>
)
