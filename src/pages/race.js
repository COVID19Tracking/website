import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import SkipNavigation from '../components/utils/skip-navigation'
import Header from '../components/layout/header'
import SEO from '../components/utils/seo'
import Footer from '../components/layout/footer'
import LandingPageContainer from '~components/common/landing-page/container'
import HeaderHero from '~components/pages/race/header-hero'
import LargeHeader from '~components/common/landing-page/header'
import RacialDataParagraph from '~components/pages/race/paragraph'
import LandingPageSection from '~components/common/landing-page/divider-section'
import CtaLinks from '~components/pages/race/cta-links'
import Charts from '~components/pages/race/charts'
import Totals from '~components/pages/race/totals'
import Press from '~components/pages/race/press'

export default () => (
  <>
    <SEO title="The COVID Racial Data Tracker" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin />
    <SkipNavContent />
    <HeaderHero />

    <main id="main">
      <LandingPageContainer>
        <LargeHeader>
          The COVID Racial Data Tracker is a collaboration between the COVID
          Tracking Project and the Antiracist Research &amp; Policy Center.
        </LargeHeader>
        <RacialDataParagraph>
          We&apos;re tracking racial and ethnic data from every state that
          reports it—and pushing those that don&apos;t to start. This data
          dashboard is updated twice per week.
        </RacialDataParagraph>
        <Totals />
        <CtaLinks />
      </LandingPageContainer>
      <LandingPageSection>
        <LandingPageContainer>
          <LargeHeader>Tracking inequity at the county level</LargeHeader>
          <RacialDataParagraph>
            State-level stats tell part of the story, but we know that much of
            America is deeply segregated. Race and ethnicity data for COVID
            cases isn&apos;t widely available at the county level, so we&apos;re
            comparing numbers we do have: infection and death rates for each
            county, using a New York Times dataset, with the latest US Census
            breakdowns of race and ethnicity in that county. The results are
            staggering.
          </RacialDataParagraph>
        </LandingPageContainer>
        <Charts />
      </LandingPageSection>

      <LandingPageSection noBorder>
        <LandingPageContainer>
          <LargeHeader>
            Learn more about how COVID-19 is impacting communities of color from
            media outlets across the country.
          </LargeHeader>
          <Press />
        </LandingPageContainer>
      </LandingPageSection>
    </main>
    <Footer />
  </>
)
