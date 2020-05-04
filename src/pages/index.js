import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '../components/utils/skip-navigation'
import Header from '../components/layout/header'
import SEO from '../components/utils/seo'
import Footer from '../components/layout/footer'
import Container from '~components/common/container'
import Paragraph from '~components/pages/homepage/paragraph'
import LatestTotals from '~components/pages/homepage/latest-totals'
import LargeProject from '~components/pages/homepage/large-project'
import LargeDataset from '~components/pages/homepage/large-dataset'
import Datasets from '~components/pages/homepage/datasets'

export default () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <main id="main">
      <Paragraph>
        Every day, our volunteers compile the latest numbers on tests, confirmed
        cases, hospitalizations, and patient outcomes from every US state and
        territory.
      </Paragraph>
      <Container>
        <LatestTotals />
      </Container>
      <LargeProject />
      <Paragraph>
        Our data powers crucial reporting and research. Here are just a few of
        the organizations that rely on our dataset.
      </Paragraph>
      <Container>
        <LargeDataset />
        <Datasets />
      </Container>
    </main>
    <Footer />
  </>
)
