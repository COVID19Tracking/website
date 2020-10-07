/* eslint-disable no-unused-vars */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import DetailText from '~components/common/detail-text'
import Layout from '~components/layout'
import RaceSocialCards from '~components/social-media-graphics/race/social-cards'
import SocialCardsSelect from '~components/pages/race/infection-and-mortality-data/select'

export default () => {
  const data = useStaticQuery(graphql`
    {
      covidRaceDataHomepage {
        statesReportingCases
        statesReportingDeaths
      }
      contentfulSnippet(slug: { eq: "crdt-social-cards-preamble" }) {
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      allCovidRaceDataCombined(
        filter: { state: { nin: ["AS", "GU", "MP", "VI"] } }
      ) {
        nodes {
          state
          name
          knownRaceEthPos
          knownRaceEthDeath
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPositives
          aianDeaths
          blackPosPerCap
          blackDeathPerCap
          latinXPosPerCap
          latinXDeathPerCap
          asianPosPerCap
          asianDeathPerCap
          aianPosPerCap
          aianDeathPerCap
          whitePosPerCap
          whiteDeathPerCap
          nhpiPosPerCap
          nhpiDeathPerCap
        }
      }
      allCovidRaceDataSeparate(
        filter: { state: { nin: ["AS", "GU", "MP", "VI"] } }
      ) {
        nodes {
          state
          name
          knownRacePos
          knownRaceDeath
          knownEthPos
          knownEthDeath
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPositives
          aianDeaths
          blackPosPerCap
          blackDeathPerCap
          latinXPosPerCap
          latinXDeathPerCap
          asianPosPerCap
          asianDeathPerCap
          aianPosPerCap
          aianDeathPerCap
          whitePosPerCap
          whiteDeathPerCap
          nhpiPosPerCap
          nhpiDeathPerCap
        }
      }
      allCovidStateInfo(filter: { state: { nin: ["AS", "GU", "MP", "VI"] } }) {
        nodes {
          state
          name
          childSlug {
            slug
          }
          childPopulation {
            population
          }
        }
      }
    }
  `)

  return (
    <Layout
      title="Infection and Mortality by Race and Ethnicity"
      returnLinks={[
        { link: '/race' },
        { link: `/race/dashboard`, title: 'Racial Data Dashboard' },
      ]}
      path="/race/infection-and-mortality-data"
      centered
    >
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulSnippet.content.childMarkdownRemark.html,
        }}
      />
      <h3>See the per capita data by state</h3>
      <p>
        Select a state or territory to see the latest information about COVID-19
        cases and deaths per 100k people for each race and ethnicity. These
        charts are updated twice per week and use standard Census categories for
        race and ethnicity.
      </p>
      <p>
        <DetailText>
          The data shown in these charts are reported by the state or territory
          and do not include those with race classified as “Other” or “Two or
          more races.” Hispanic or Latino ethnicity may include any race.
        </DetailText>
      </p>
      <SocialCardsSelect
        separateStates={data.allCovidRaceDataSeparate.nodes}
        combinedStates={data.allCovidRaceDataCombined.nodes}
        stateInfo={data.allCovidStateInfo.nodes}
      />
      <RaceSocialCards />
    </Layout>
  )
}
