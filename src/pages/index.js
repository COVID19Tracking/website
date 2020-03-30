import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link } from 'gatsby'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import Hero from '../components/common/hero'
import LeadParagraph from '../components/common/lead-paragraph'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/pages/homepage/press-list'

export default () => (
  <>
    <SEO />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <Hero />
    <main id="main">
      <SkipNavContent />
      <Container>
        <PressLogos />
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
          , but no governmental or institutional source is publishing complete
          testing data—including not just identified cases, but how many people
          have been tested and how many tests are pending. Without this data, we
          cannot understand enough about regional outbreaks to make sound
          decisions about interventions. (“Read more” link, styled in a way that
          is pleasing to the designers)
        </p>
        <h2>In the Press</h2>

        <PressList />
        <p>
          <Link to="/about/in-the-press">
            View more articles that use our data
          </Link>
        </p>
        <p>
          <Link to="/data">Look up your state’s data report card</Link> and{' '}
          <Link to="/help">find out how to help</Link>.
        </p>
      </Container>
    </main>
    <Footer />
  </>
)
