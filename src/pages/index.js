import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link } from 'gatsby'
import { Flex, Box } from 'reflexbox'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import DetailText from '../components/common/detail-text'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import Hero from '../components/common/hero'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/pages/homepage/press-list'
import pbsMap from '../images/homepage-visualizations/pbs-map.png'
import nytGraph from '../images/homepage-visualizations/nyt.png'
import '../scss/pages/homepage.scss'

export default () => (
  <>
    <SEO />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <Hero />
    <main id="main">
      <SkipNavContent />
      <Container>
        <h2>From visualization gallery</h2>
        <Flex flexWrap="wrap" className="homepage-visualizations">
          <Box width={[1, 1 / 2]} pr={[0, 3]}>
            <img src={pbsMap} alt="PBS COVID Map" />
            <p>
              <a href="https://www.pbs.org/newshour/features/coronavirus/us/">
                Real-time Coronavirus Map
              </a>
            </p>
            <DetailText>Source: PBS</DetailText>
          </Box>
          <Box width={[1, 1 / 2]} pl={[0, 5]}>
            <img src={nytGraph} alt="New York Times chart" />
            <p>
              <a href="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html">
                U.S. Lags in Coronavirus Testing After Slow Response to Outbreak
              </a>
            </p>
            <DetailText>Source: New York Times</DetailText>
          </Box>
        </Flex>
        <PressLogos />
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 2]} pr={[0, 3]}>
            <h2>Why this data matters</h2>
            <p>
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
            <h2>Get involved</h2>
            <Flex flexWrap="wrap">
              <Box
                width={[1, 1 / 2]}
                my={[2, 0]}
                pr={[0, 2]}
                className="homepage-get-involved"
              >
                <Link to="/data">
                  Check your state&apos;s testing data report card
                </Link>
              </Box>
              <Box
                width={[1, 1 / 2]}
                my={[2, 0]}
                className="homepage-get-involved"
              >
                <Link to="/help">Help us get better data</Link>
              </Box>
            </Flex>
          </Box>
          <Box width={[1, 1 / 2]}>
            <h2>In the Press</h2>

            <PressList />
            <p>
              <Link to="/about/in-the-press">
                View more articles that use our data
              </Link>
            </p>
          </Box>
        </Flex>
      </Container>
    </main>
    <Footer />
  </>
)
