import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import Feature from '~components/common/landing-page/feature'
import LandingPageContainer from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import chartsStyle from './charts.module.scss'

import CountyTable from './county-table'
import CountyChart from './county-chart'
import CountyChartLegend from './county-chart-legend'

const numberToWord = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
]

const numberWords = number =>
  typeof numberToWord[number] === 'undefined' ? number : numberToWord[number]

const DisclaimerNY = ({ data }) => (
  <>
    {data.find(county => county.name === 'New York City') && (
      <span className={chartsStyle.nycDisclaimer}>
        Note that <em>The New York Times</em> county dataset combines the five
        counties that make up New York City&amp;s boroughs (New York County,
        Kings County, Bronx County, Richmond County, and Queens County) into one
        listing for New York City. When combined, these counties show up as
        predominantly White, non-Hispanic. However, Bronx County, which is
        predominantly Hispanic/Latino and/or Black, has been a hotspot for COVID
        cases and deaths.
      </span>
    )}
  </>
)

export default () => {
  const [isCasesOpen, setIsCasesOpen] = useState(false)
  const [isDeathsOpen, setIsDeathsOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      allCounties(filter: { demographics: { total: { gt: 0 } } }) {
        nodes {
          id
          name
          state
          current {
            cases
            deaths
          }
          demographics {
            abbreviation
            total
            largestRace1
            largestRace1pct
            largestRace2
            largestRace2pct
            largestRace3
            largestRace3pct
          }
        }
      }
    }
  `)

  const tableSource = data.allCounties.nodes.map(county => {
    return {
      ...county,
      casesPer100k: (county.current.cases / county.demographics.total) * 100000,
      deathsPer100k:
        (county.current.deaths / county.demographics.total) * 100000,
    }
  })

  const countiesByCases = tableSource
    .sort((a, b) => (a.casesPer100k > b.casesPer100k ? -1 : 1))
    .slice(0, 20)

  const countiesByDeaths = tableSource
    .sort((a, b) => (a.deathsPer100k > b.deathsPer100k ? -1 : 1))
    .slice(0, 20)

  let totalHighestRepresented = 0
  let topRepresented = 0
  countiesByDeaths.forEach((county, index) => {
    if (
      county.demographics.largestRace1 === 'Black or African American alone'
    ) {
      totalHighestRepresented += 1
      if (index < 5) {
        topRepresented += 1
      }
    }
  })
  return (
    <>
      <LandingPageContainer>
        <Disclosure
          open={isCasesOpen}
          onChange={() => setIsCasesOpen(!isCasesOpen)}
        >
          <Feature
            element={
              <>
                <h3>Counties with the 20 highest infection rates</h3>
                <CountyChartLegend data={countiesByCases} />
                <CountyChart data={[...countiesByCases]} field="casesPer100k" />
              </>
            }
          >
            This chart shows the 20 counties with the highest level of
            infections per capita, and the largest racial or ethnic group in
            that county. Non-Hispanic White people represent the largest racial
            group in most of these counties. This is in line with Census
            statistics, which show that more than 60 percent of Americans are
            White, non-Hispanic or Latino.
            <DisclaimerNY data={countiesByCases} />
            <DisclosureButton className={chartsStyle.showChartData}>
              {isCasesOpen ? (
                <>
                  Hide chart data <span aria-hidden>↑</span>
                </>
              ) : (
                <>
                  Show chart data <span aria-hidden>↓</span>
                </>
              )}
            </DisclosureButton>
          </Feature>
          <DisclosurePanel>
            <CountyTable
              defaultSort="casesPer100k"
              tableSource={[...countiesByCases]}
              getRank={county =>
                countiesByCases.findIndex(item => item.id === county.id) + 1
              }
            />
            <CtaLink to="/race/data/covid-county-by-race.csv">
              Download the CSV
            </CtaLink>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure
          open={isDeathsOpen}
          onChange={() => setIsDeathsOpen(!isDeathsOpen)}
        >
          <Feature
            element={
              <>
                <h3>Counties with the 20 highest death rates</h3>
                <CountyChartLegend data={countiesByDeaths} />

                <CountyChart
                  data={[...countiesByDeaths]}
                  field="deathsPer100k"
                />
              </>
            }
            flip
          >
            When we look at the 20 counties with the highest level of deaths per
            capita, we see a different story. In{' '}
            {numberWords(totalHighestRepresented).toLowerCase()} of these 20
            counties, Black people represent the largest racial group.{' '}
            {numberWords(topRepresented)} of the top five counties with the
            highest death rates in the nation are all predominantly Black.
            <DisclaimerNY data={countiesByDeaths} />
            <DisclosureButton className={chartsStyle.showChartData}>
              {isDeathsOpen ? (
                <>
                  Hide chart data <span aria-hidden>↑</span>
                </>
              ) : (
                <>
                  Show chart data <span aria-hidden>↓</span>
                </>
              )}
            </DisclosureButton>
          </Feature>
          <DisclosurePanel>
            <CountyTable
              defaultSort="deathsPer100k"
              tableSource={[...countiesByDeaths]}
              getRank={county =>
                countiesByDeaths.findIndex(item => item.id === county.id) + 1
              }
            />
            <CtaLink to="/race/data/covid-county-by-race.csv">
              Download the CSV
            </CtaLink>
          </DisclosurePanel>
        </Disclosure>
      </LandingPageContainer>
    </>
  )
}
