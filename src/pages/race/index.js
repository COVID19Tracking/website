import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { useStaticQuery, graphql } from 'gatsby'
import SkipNavigation from '~components/utils/skip-navigation'
import Header from '~components/layout/header'
import SEO from '~components/utils/seo'
import Footer from '~components/layout/footer'
import LandingPageContainer from '~components/common/landing-page/container'
import HeaderHero from '~components/pages/race/header-hero'
import LargeHeader from '~components/common/landing-page/header'
import RacialDataParagraph from '~components/pages/race/paragraph'
import LandingPageSection from '~components/common/landing-page/divider-section'
import NationalChart from '~components/pages/race/national-chart'
import RacePressContainer from '~components/pages/race/press-container'
import CtaLinks from '~components/pages/race/cta-links'
import Charts from '~components/pages/race/charts/county-overview-charts'
import Totals from '~components/pages/race/totals'
import Press from '~components/pages/race/press'
import { FormatNumber } from '~components/utils/format'

const RacePage = () => {
  const data = useStaticQuery(graphql`
    query {
      covidRaceDataHomepage {
        blackwhiteRateRatio
      }
      contentfulSocialCard(slug: { eq: "racial-data-tracker" }) {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
    }
  `)
  const { blackwhiteRateRatio } = data.covidRaceDataHomepage
  return (
    <>
      <SEO
        title="The COVID Racial Data Tracker"
        socialCard={data.contentfulSocialCard}
      />
      <SkipNavigation />
      <Header
        siteTitle="The COVID Tracking Project"
        title="The COVID Racial Data Tracker"
        path="/race"
        noMargin
      />
      <SkipNavContent />
      <HeaderHero />

      <main id="main">
        <LandingPageSection noBorder noMargin>
          <LandingPageContainer>
            <LargeHeader center narrow>
              Nationwide, Black people are dying at{' '}
              <FormatNumber number={blackwhiteRateRatio} precision={1} /> times
              the rate of white people.
            </LargeHeader>
            <NationalChart />
          </LandingPageContainer>
        </LandingPageSection>
        <LandingPageSection noMargin>
          <LandingPageContainer>
            <LargeHeader center noMargin>
              We’ve asked every state to report complete race and ethnicity
              data. Our Racial Data Dashboard has the latest.
            </LargeHeader>
            <Totals />
            <CtaLinks />
          </LandingPageContainer>
        </LandingPageSection>
        <LandingPageSection noBorder noMargin>
          <LandingPageContainer>
            <LargeHeader center>
              Tracking inequity at the county level
            </LargeHeader>
            <RacialDataParagraph>
              State-level statistics tell part of the story, but many US states
              are also deeply segregated—meaning different counties in the same
              state can have vastly different breakdowns by race and ethnicity.
            </RacialDataParagraph>
            <RacialDataParagraph>
              Race and ethnicity data for COVID cases isn&apos;t widely
              available at the county level, so we&apos;re using two numbers we
              do have: the latest infection and death rates for each county,
              from a <cite>New York Times</cite> dataset, paired with the
              largest racial or ethnic group in that county, based on the Census
              Bureau&apos;s 2019 ACS 5-Year estimates. The results are
              staggering.
            </RacialDataParagraph>
          </LandingPageContainer>
          <Charts />
        </LandingPageSection>

        <LandingPageSection noBottomBorder noMargin>
          <LandingPageContainer>
            <LargeHeader center>
              Learn more from media outlets across the country about how
              COVID-19 is impacting communities of color.
            </LargeHeader>
          </LandingPageContainer>
          <RacePressContainer>
            <Press />
          </RacePressContainer>
        </LandingPageSection>
      </main>
      <Footer />
    </>
  )
}

export default RacePage
