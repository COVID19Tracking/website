import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link } from 'gatsby'
import { Flex, Box } from '../components/common/flexbox'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/pages/homepage/press-list'
import Visualizations from '../components/pages/homepage/visualizations'
import '../scss/pages/homepage.scss'

export default () => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <h1 className="a11y-only">The COVID Tracking Project</h1>

    <div className="homepage-press-logos-wrapper">
      <Container>
        <h2>Our data has been cited by</h2>
        <PressLogos onlyFeatured />
      </Container>
    </div>
    <main id="main">
      <SkipNavContent />
      <Visualizations />
      <Container>
        <Flex flexWrap="wrap" mt={['1rem', '2rem']}>
          <Box width={[1, 1, 2 / 3]} pr={[0, '1rem', '5rem']}>
            <h2>Why this data matters</h2>
            <p className="paragraph-big">
              The{' '}
              <a href="https://coronavirus.jhu.edu/">
                heroes at Johns Hopkins University
              </a>{' '}
              maintain a{' '}
              <a href="https://coronavirus.jhu.edu/map.html">
                comprehensive case count
              </a>
              , but no governmental or institutional source is publishing
              complete testing data—including not just identified cases, but how
              many people have been tested and how many tests are pending.
              Without this data, we cannot understand enough about regional
              outbreaks to make sound decisions about interventions. (“Read
              more” link, styled in a way that is pleasing to the designers)
            </p>
            <div className="homepage-get-involved">
              <div className="homepage-get-involved-icon">→</div>
              <p>
                <Link to="/data">
                  Check your state&apos;s testing data report card
                </Link>{' '}
                to see the quality of the data they are providing.
              </p>
            </div>
            <div className="homepage-get-involved">
              <div className="homepage-get-involved-icon">→</div>
              <p>
                Want to get involved?{' '}
                <Link to="/help" className="hompeage-get-involved">
                  Help us get better data
                </Link>
                .
              </p>
            </div>
          </Box>
          <Box width={[1, 1, 1 / 3]}>
            <Link to="/about/in-the-press" className="homepage-press-list-more">
              More news
            </Link>
            <h2>In the Press</h2>

            <PressList />
          </Box>
        </Flex>
      </Container>
    </main>
    <Footer />
  </>
)
