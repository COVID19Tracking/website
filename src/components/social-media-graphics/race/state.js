import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import { stringifyList } from '~utilities/list-formatter'

import { FormatNumber } from '~components/utils/format'
import Percent from '~components/pages/race/dashboard/percent'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'
import alertIcon from '~images/race-dashboard/alert-bang-orange.svg'

import socialCardStyle from './state.module.scss'

const getGroups = (state, population) => {
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
  return {
    affectedGroups,
    groups,
    largestCases,
    largestDeaths,
    all,
  }
}

const SocialCardLede = ({ typeOfRates, state, stateName, population }) => {
  const today = new Date()
  const { affectedGroups } = getGroups(state, population)
  return (
    <>
      In <strong>{stateName || state.name}</strong>, as of{' '}
      {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
      {affectedGroups && affectedGroups.length ? (
        <>
          {typeOfRates} among {stringifyList({ arr: affectedGroups })} people
          are higher than the overall population.
        </>
      ) : (
        <>
          there are no groups with higher {typeOfRates} than the overall
          population.
        </>
      )}
    </>
  )
}

const StateRaceSocialCard = renderedComponent(
  ({ state, population, combinedStates }) => {
    // gets the width of the bar for the bar charts
    const getWidth = (number, max) =>
      `${number / max > 0.1 ? (number / max) * 100 : 10}%`
    // prepend 'The' to DC's name
    const stateName =
      state.stateName === 'District of Columbia'
        ? 'The District of Columbia'
        : state.stateName

    const raceDict = {
      Black: 'Black/African American',
      'Hispanic/Latino': 'Hispanic/Latino',
      All: 'All',
      Asian: 'Asian',
      AIAN: 'American Indian or Alaska Native',
      White: 'White',
      NHPI: 'Native Hawaiian and Pacific Islander',
    }

    const groupValues = getGroups(state, population)
    let { affectedGroups } = groupValues
    const { groups } = groupValues

    let noDeaths
    let noCases

    const isCombinedState = combinedStates.indexOf(state.state) >= 0

    if (isCombinedState) {
      // if this state combines race and ethnicity data
      noDeaths = parseFloat(state.knownRaceEthDeath) === 0
      noCases = parseFloat(state.knownRaceEthPos) === 0
    } else {
      noDeaths = parseFloat(state.knownRaceDeath) === 0
      noCases = parseFloat(state.knownRacePos) === 0
    }

    const oneChart = (noCases || noDeaths) && !(noCases && noDeaths)

    const noCharts = noCases && noDeaths

    const casesOnly = oneChart && noDeaths

    const deathsOnly = oneChart && noCases

    let typeOfRates = 'infection and death rates'

    if (deathsOnly) {
      // if deaths are the only reported data
      typeOfRates = 'death rates'
      groups.sort((a, b) => {
        // sort bars by # of deaths
        if (a.deaths >= b.deaths) {
          return -1
        }
        return 1
      })

      affectedGroups = []
      groups.forEach(group => {
        if (group.all || !group.deaths) {
          return
        }
        if (group.deaths > groupValues.all.deaths) {
          affectedGroups.push(group.label)
        }
      })
    }

    if (casesOnly) {
      typeOfRates = 'case rates'

      affectedGroups = []
      groups.forEach(group => {
        if (group.all || !group.cases) {
          return
        }
        if (group.cases > groupValues.all.cases) {
          affectedGroups.push(group.label)
        }
      })
    }

    const today = new Date()
    if (noCharts) {
      return (
        <div>
          <div className={socialCardStyle.noDataContainer}>
            <img src={alertIcon} alt="Alert icon" width="60px" />
            <p>
              As of {today.toLocaleString('default', { month: 'long' })}{' '}
              {today.getDate()}, <strong>{stateName}</strong> did not report
              race and ethnicity data to allow for this comparison.
            </p>
            <p className={socialCardStyle.getBetterData}>
              Help us get better data:
              <br />
              <strong>www.covidtracking.com/race/get-better-data</strong>
            </p>
          </div>
          <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
          <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
        </div>
      )
    }

    return (
      <div className={socialCardStyle.container}>
        <div
          className={classnames(
            socialCardStyle.grid,
            casesOnly && socialCardStyle.casesOnly,
            deathsOnly && socialCardStyle.deathsOnly,
          )}
        >
          <span />
          <p className={socialCardStyle.header}>
            <SocialCardLede
              typeOfRates={typeOfRates}
              state={state}
              population={population}
            />
          </p>
          <span /> {/* spacer for css grid */}
          {!deathsOnly && (
            <span
              className={classnames(
                socialCardStyle.casesHeader,
                socialCardStyle.barHeader,
              )}
            >
              Cases per 100,000 people
            </span>
          )}
          {!casesOnly && (
            <span
              className={classnames(
                socialCardStyle.deathsHeader,
                socialCardStyle.barHeader,
              )}
            >
              Deaths per 100,000 people
            </span>
          )}
          {groups.map(({ label, style, cases, deaths }) => (
            <>
              <span className={socialCardStyle.barLabel}>
                {raceDict[label]}
              </span>
              {!deathsOnly && (
                <div
                  className={classnames(socialCardStyle.bar, style)}
                  style={{ width: getWidth(cases, groupValues.largestCases) }}
                >
                  <FormatNumber number={cases} />
                </div>
              )}
              {!casesOnly && (
                <div
                  className={classnames(
                    socialCardStyle.bar,
                    socialCardStyle.deathBar,
                    style,
                  )}
                  style={{ width: getWidth(deaths, groupValues.largestDeaths) }}
                >
                  <FormatNumber number={deaths} />
                </div>
              )}
            </>
          ))}
          <p className={socialCardStyle.percent}>
            {state.knownRaceEthPos ? (
              <>
                <strong>Notes: </strong> {stateName} has reported race and
                ethnicity data for <Percent number={state.knownRaceEthPos} /> of
                cases and <Percent number={state.knownRaceEthDeath} /> of
                deaths.
              </>
            ) : (
              <>
                <strong>Notes: </strong> {stateName} has reported race data for{' '}
                <Percent number={state.knownRacePos} /> of cases and{' '}
                <Percent number={state.knownRaceDeath} /> of deaths, and
                ethnicity data for <Percent number={state.knownEthPos} /> of
                cases and <Percent number={state.knownEthDeath} /> of deaths.
              </>
            )}{' '}
            Graphic only includes demographic groups reported by the state.
          </p>
        </div>

        <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
        <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
      </div>
    )
  },
)

const CreateStateRaceSocialCards = () => {
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

  const combinedStates = data.allCovidRaceDataCombined.nodes.map(
    node => node.state,
  )

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
          combinedStates={combinedStates}
          renderOptions={{
            width: 900,
            height: 472.5,
            relativePath: 'race-dashboard',
            filename: `${state.childSlug.slug}`,
          }}
        />
      ))}
    </>
  )
}

export default CreateStateRaceSocialCards

export { SocialCardLede, getGroups }
