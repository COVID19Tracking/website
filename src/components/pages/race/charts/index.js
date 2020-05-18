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
            total
            largestRace1
            largestRace2
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
  return (
    <>
      <LandingPageContainer>
        <CountyChartLegend />
        <Disclosure
          open={isCasesOpen}
          onChange={() => setIsCasesOpen(!isCasesOpen)}
        >
          <Feature
            element={
              <CountyChart data={[...countiesByCases]} field="casesPer100k" />
            }
            title="Counties with the 20 highest infection rates"
          >
            This chart shows the 20 counties with the highest level of
            infections per capita, and the largest racial or ethnic group in
            that county. White people represent the largest racial group in most
            of these counties. This is in line with Census statistics, which
            show that more than 60 percent of Americans are White, non-Hispanic
            or Latino.
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
              <CountyChart data={[...countiesByDeaths]} field="deathsPer100k" />
            }
            title="Counties with the 20 highest death rates"
            flip
          >
            When we look at the 20 counties with the highest level of deaths per
            capita, we see a different story. In eight of these 20 counties,
            Black people represent the largest racial group—and glaringly, the
            counties with the three highest death rates in the nation are all
            predominantly Black.
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
              defaultSort="casesPer100k"
              tableSource={[...countiesByDeaths]}
              getRank={county =>
                countiesByCases.findIndex(item => item.id === county.id) + 1
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
