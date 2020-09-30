import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '~components/utils/skip-navigation'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'
import Footer from '~components/layout/footer'
import Container from '~components/common/landing-page/container'
import HeaderHero from '~components/pages/homepage/header-hero'
import BlogList from '~components/pages/homepage/blog-list'
import Datasets from '~components/pages/homepage/datasets'
import LargeDataset from '~components/pages/homepage/large-dataset'
import LargeProject from '~components/pages/homepage/large-project'
import LatestTotals from '~components/pages/homepage/latest-totals'
import Press from '~components/pages/homepage/press'

const Homepage = () => (
  <>
    <SEO title="The COVID-19 Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID-19 Tracking Project" noMargin />
    <SkipNavContent />
    <HeaderHero />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <Container>
        <LatestTotals />
      </Container>
      <LargeProject />
      <Container>
        <LargeDataset />
        <Datasets />
      </Container>
      <BlogList />
      <Container>
        <Press />
      </Container>
    </main>
    <Footer />
  </>
)

export default Homepage
