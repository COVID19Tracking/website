import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import { stringifyList } from '~utilities/list-formatter'

import { FormatNumber } from '~components/utils/format'
import Percent from '~components/pages/race/dashboard/percent'

import logo from '~images/project-logo-black.svg'
import socialCardStyle from './state.module.scss'

const StateRaceSocialCard = renderedComponent(({ state, population }) => {
  let totalCases = 0
  let totalDeaths = 0

  Object.keys(state).forEach(field => {
    if (field.search('Positives') > -1) {
      if (state[field]) {
        totalCases += parseInt(state[field], 10)
      }
    }
    if (field.search('Deaths') > -1) {
      if (state[field]) {
        totalDeaths += parseInt(state[field], 10)
      }
    }
  })

  let groups = [
    {
      label: 'Black',
      style: socialCardStyle.barBlack,
      cases: state.blackPosPercap * 100, // perCap is *per 1,000*, mulitply by 100 to get *per 100,000*
      deaths: state.blackDeathPercap * 100,
    },
    {
      label: 'Hispanic/Latino',
      style: socialCardStyle.barLatinx,
      cases: state.latinXPosPercap * 100,
      deaths: state.latinXDeathPercap * 100,
    },
    {
      label: 'All',
      all: true,
      style: socialCardStyle.barAll,
      cases: Math.round((totalCases / population) * 100000),
      deaths: Math.round((totalDeaths / population) * 100000),
    },
    {
      label: 'Asian',
      style: socialCardStyle.barAsian,
      cases: state.asianPosPercap * 100,
      deaths: state.asianDeathPercap * 100,
    },
    {
      label: 'AIAN',
      style: socialCardStyle.barAian,
      cases: state.aianPosPercap * 100,
      deaths: state.aianDeathPercap * 100,
    },
    {
      label: 'White',
      style: socialCardStyle.barWhite,
      cases: state.whitePosPercap * 100,
      deaths: state.whiteDeathPercap * 100,
    },
    {
      label: 'NHPI',
      style: socialCardStyle.barNhpi,
      cases: state.nhpiPosPercap * 100,
      deaths: state.nhpiDeathPercap * 100,
    },
  ]

  groups = groups.filter(
    // remove groups without case or death data
    group => group.cases !== undefined && group.deaths !== undefined,
  )

  const affectedGroups = []
  const all = groups.find(group => group.all)

  const largestCases = Math.max(...groups.map(group => group.cases))
  const largestDeaths = Math.max(...groups.map(group => group.deaths))

  groups.forEach(group => {
    if (group.all || (!group.cases && !group.deaths)) {
      return
    }
    if (group.cases > all.cases && group.deaths > all.deaths) {
      affectedGroups.push(group.label)
    }
  })

  groups.sort((a, b) => {
    // sort bars by # of cases
    if (a.cases >= b.cases) {
      return -1
    }
    return 1
  })

  // gets the width of the bar for the bar charts
  const getWidth = (number, max) =>
    `${number / max > 0.1 ? (number / max) * 100 : 10}%`
  // prepend 'The' to DC's name
  const stateName =
    state.stateName === 'District of Columbia'
      ? 'The District of Columbia'
      : state.stateName

  return (
    <div className={socialCardStyle.container}>
      <div className={socialCardStyle.grid}>
        <span />
        <p className={socialCardStyle.header}>
          In <strong>{stateName}</strong>,{' '}
          {affectedGroups && affectedGroups.length ? (
            <>
              infection and death rates among{' '}
              {stringifyList({ arr: affectedGroups })} people are higher than
              the overall population.
            </>
          ) : (
            <>
              there are no groups with higher infection and death rates than the
              overall population.
            </>
          )}
        </p>
        <span /> {/* spacer for css grid */}
        <span
          className={classnames(
            socialCardStyle.casesHeader,
            socialCardStyle.barHeader,
          )}
        >
          Cases per 100,000 people
        </span>
        <span
          className={classnames(
            socialCardStyle.deathsHeader,
            socialCardStyle.barHeader,
          )}
        >
          Deaths per 100,000 people
        </span>
        {groups.map(({ label, style, cases, deaths }) => (
          <>
            <span className={socialCardStyle.barLabel}>{label}</span>
            <div
              className={classnames(socialCardStyle.bar, style)}
              style={{ width: getWidth(cases, largestCases) }}
            >
              <FormatNumber number={cases} />
            </div>
            <div
              className={classnames(
                socialCardStyle.bar,
                socialCardStyle.deathBar,
                style,
              )}
              style={{ width: getWidth(deaths, largestDeaths) }}
            >
              <FormatNumber number={deaths} />
            </div>
          </>
        ))}
      </div>

      <p className={socialCardStyle.percent}>
        {state.knownRaceEthPos ? (
          <>
            {stateName} has reported race and ethnicity data for{' '}
            <Percent number={state.knownRaceEthPos} /> of cases and{' '}
            <Percent number={state.knownRaceEthDeath} /> of deaths.
          </>
        ) : (
          <>
            {stateName} has reported race data for{' '}
            <Percent number={state.knownRacePos} /> of cases and{' '}
            <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity
            data for <Percent number={state.knownEthPos} /> of cases and{' '}
            <Percent number={state.knownEthDeath} /> of deaths.
          </>
        )}
        TODO TODO copy about removing missing rate/ethnicity data TODO TODO
      </p>
      <img src={logo} alt="" className={socialCardStyle.logo} />
    </div>
  )
})

export default () => {
  const data = useStaticQuery(graphql`
    {
      allCovidRaceDataCombined(filter: { state: { ne: "US" } }) {
        nodes {
          state
          stateName
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
          blackPosPercap
          blackDeathPercap
          latinXPosPercap
          latinXDeathPercap
          asianPosPercap
          asianDeathPercap
          aianPosPercap
          aianDeathPercap
          whitePosPercap
          whiteDeathPercap
          nhpiPosPercap
          nhpiDeathPercap
        }
      }
      allCovidRaceDataSeparate(filter: { state: { ne: "US" } }) {
        nodes {
          state
          stateName
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
          blackPosPercap
          blackDeathPercap
          latinXPosPercap
          latinXDeathPercap
          asianPosPercap
          asianDeathPercap
          aianPosPercap
          aianDeathPercap
          whitePosPercap
          whiteDeathPercap
          nhpiPosPercap
          nhpiDeathPercap
        }
      }
      allCovidStateInfo(filter: { state: { ne: "US" } }) {
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
  const states = data.allCovidStateInfo.nodes

  return (
    <>
      {states.map(state => (
        <StateRaceSocialCard
          state={
            data.allCovidRaceDataSeparate.nodes.find(
              node => node.state === state.state,
            ) ||
            data.allCovidRaceDataCombined.nodes.find(
              node => node.state === state.state,
            )
          }
          population={
            data.allCovidStateInfo.nodes.find(
              node => node.state === state.state,
            ).childPopulation.population
          }
          renderOptions={{
            width: 1300,
            height: 630,
            relativePath: 'race-dashboard',
            filename: `${state.childSlug.slug}`,
          }}
        />
      ))}
    </>
  )
}
