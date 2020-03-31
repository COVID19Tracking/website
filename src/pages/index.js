import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link } from 'gatsby'
import { Flex, Box } from '../components/common/flexbox'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import DetailText from '../components/common/detail-text'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/pages/homepage/press-list'
import wsjMap from '../images/homepage-visualizations/wsj.png'
import nytGraph from '../images/homepage-visualizations/nyt.png'
import politicoGraph from '../images/homepage-visualizations/politico.png'
import '../scss/pages/homepage.scss'

export default () => (
  <>
    <SEO />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />

    <div className="homepage-press-logos-wrapper">
      <Container>
        <h2>Our data has been cited by</h2>
        <PressLogos onlyFeatured />
      </Container>
    </div>
    <main id="main">
      <SkipNavContent />
      <Container>
        <h2>From visualization gallery</h2>
        <Flex flexWrap="wrap" className="homepage-visualizations">
          <Box width={[1, 1, 1 / 3]} pr={[0, '0.5rem']}>
            <img src={wsjMap} alt="WSJ COVID Map" />
            <p>
              <a href="https://www.wsj.com/articles/how-the-cdcs-restrictive-testing-guidelines-hid-the-coronavirus-epidemic-11584882001">
                How the CDC’s Restrictive Testing Guidelines Hid the Coronavirus
                Epidemic
              </a>
            </p>
            <DetailText>Source: Wall Street Journal</DetailText>
          </Box>
          <Box width={[1, 1, 1 / 3]} pl={[0, '0.5rem']}>
            <img src={politicoGraph} alt="Politico chart" />
            <p>
              <a href="https://www.politico.com/interactives/2020/coronavirus-testing-by-state-chart-of-new-cases/">
                How many coronavirus cases have been reported in each U.S.
                state?
              </a>
            </p>
            <DetailText>Source: Politico</DetailText>
          </Box>
          <Box width={[1, 1, 1 / 3]} px={[0, '0.5rem']}>
            <img src={nytGraph} alt="New York Times chart" />
            <p>
              <a href="https://www.nytimes.com/interactive/2020/03/17/us/coronavirus-testing-data.html">
                U.S. Lags in Coronavirus Testing After Slow Response to Outbreak
              </a>
            </p>
            <DetailText>Source: New York Times</DetailText>
          </Box>
        </Flex>
        <Flex flexWrap="wrap" mt={['1rem', '2rem']}>
          <Box width={[1, 1, 2 / 3]} pr={[0, '1rem']}>
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
