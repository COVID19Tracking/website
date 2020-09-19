import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'

import { renderedComponent } from '~plugins/gatsby-render-components'

import { FormatNumber } from '~components/utils/format'
import Percent from '~components/pages/race/dashboard/percent'

import Logo from '~images/ctp-icon-small.png'
import CarLogo from '~images/car-logo-small.png'
import alertIcon from '~images/race-dashboard/alert-bang-orange.svg'

import socialCardStyle from './state.module.scss'

const getStateStatus = (state, combinedStates) => {
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

  return {
    oneChart,
    noCharts,
    casesOnly,
    deathsOnly,
  }
}

const getGroups = state => {
  if (state === undefined) {
    return {}
  }

  let groups = [
    {
      label: 'Black/African American',
      style: socialCardStyle.barBlack,
      cases:
        state.blackPosPercap === '' ? undefined : state.blackPosPercap * 100, // perCap is *per 1,000*, mulitply by 100 to get *per 100,000*
      deaths:
        state.blackDeathPercap === ''
          ? undefined
          : state.blackDeathPercap * 100,
    },
    {
      label: 'Hispanic/Latino',
      style: socialCardStyle.barLatinx,
      cases:
        state.latinXPosPercap === '' ? undefined : state.latinXPosPercap * 100,
      deaths:
        state.latinXDeathPercap === ''
          ? undefined
          : state.latinXDeathPercap * 100,
    },
    {
      label: 'Asian',
      style: socialCardStyle.barAsian,
      cases:
        state.asianPosPercap === '' ? undefined : state.asianPosPercap * 100,
      deaths:
        state.asianDeathPercap === ''
          ? undefined
          : state.asianDeathPercap * 100,
    },
    {
      label: 'American Indian/Alaska Native',
      style: socialCardStyle.barAian,
      cases: state.aianPosPercap === '' ? undefined : state.aianPosPercap * 100,
      deaths:
        state.aianDeathPercap === '' ? undefined : state.aianDeathPercap * 100,
    },
    {
      label: 'White',
      style: socialCardStyle.barWhite,
      cases:
        state.whitePosPercap === '' ? undefined : state.whitePosPercap * 100,
      deaths:
        state.whiteDeathPercap === ''
          ? undefined
          : state.whiteDeathPercap * 100,
    },
    {
      label: 'Asian/Pacific Islander',
      style: socialCardStyle.barAPi,
      cases: state.apiPosPercap === '' ? undefined : state.apiPosPercap * 100,
      deaths:
        state.apiDeathPercap === '' ? undefined : state.apiDeathPercap * 100,
    },
    {
      label: 'Native Hawaiian/Pacific Islander',
      style: socialCardStyle.barNhpi,
      cases: state.nhpiPosPercap === '' ? undefined : state.nhpiPosPercap * 100,
      deaths:
        state.nhpiDeathPercap === '' ? undefined : state.nhpiDeathPercap * 100,
    },
  ]

  const aPi = groups.find(group => group.label === 'Asian/Pacific Islander')

  if (
    (aPi.cases === '' && aPi.deaths === '') ||
    (aPi.cases === undefined && aPi.deaths === undefined)
  ) {
    groups = groups.filter(
      // remove API bar
      group => group.label !== 'Asian/Pacific Islander',
    )
  } else {
    groups = groups.filter(
      // remove asian and NHPI bars
      group =>
        group.label !== 'Native Hawaiian/Pacific Islander' &&
        group.label !== 'Asian',
    )
  }

  groups = groups.filter(
    // remove groups without case or death data
    group => !(group.cases === '' && group.deaths === ''),
  )

  groups = groups.filter(
    // remove groups without case or death data
    group => !(group.cases === undefined && group.deaths === undefined),
  )

  const maxCasesPerCap = Math.max(...groups.map(group => group.cases))
  const maxDeathsPerCap = Math.max(...groups.map(group => group.deaths))

  groups.sort((a, b) => {
    // sort bars by # of deaths
    if (a.deaths >= b.deaths) {
      return -1
    }
    return 1
  })

  /*
    Copy to be used whenever {{GROUP}} is written
    e.g., "In Hawaii, as of September 16, Asians/Pacific Islanders
    have the highest COVID-19 infection rates..."
  */
  const copyLabels = {
    'Black/African American': 'Black/African American people',
    'Hispanic/Latino': 'Hispanic/Latino people',
    Asian: 'Asian people',
    White: 'White people',
    'Asian/Pacific Islander': 'Asians/Pacific Islanders',
    'Native Hawaiian/Pacific Islander': 'Native Hawaiians/Pacific Islanders',
    'American Indian/Alaska Native': 'American Indians/Alaska Natives',
  }

  const worstDeathsValue = groups[0].deaths
  const worstDeathsGroup = copyLabels[groups[0].label]

  groups.sort((a, b) => {
    // sort bars by # of cases
    if (a.cases >= b.cases) {
      return -1
    }
    return 1
  })

  const worstCasesValue = groups[0].cases
  const worstCasesGroup = copyLabels[groups[0].label]

  groups.forEach(group => {
    /* eslint-disable no-param-reassign */
    if (group.deaths === undefined && group.cases) {
      group.justCases = true
    } else {
      group.justCases = false
    }
    if (group.cases === undefined && group.deaths) {
      group.justDeaths = true
    } else {
      group.justDeaths = false
    }
  })

  return {
    groups,
    maxCasesPerCap,
    maxDeathsPerCap,
    worstCasesGroup,
    worstCasesValue,
    worstDeathsGroup,
    worstDeathsValue,
  }
}

const getTypeOfRates = (state, combinedStates) => {
  const stateStatus = getStateStatus(state, combinedStates)

  if (stateStatus.noCharts) {
    return 'no rates'
  }

  if (stateStatus.deathsOnly) {
    return 'mortality rates'
  }

  if (stateStatus.casesOnly) {
    return 'infection rates'
  }

  return 'infection and mortality rates'
}

const SocialCardHeader = ({ state, stateName }) => {
  const today = new Date()
  const { worstCasesGroup, worstDeathsGroup } = getGroups(state)
  if (worstDeathsGroup === worstCasesGroup) {
    return (
      <>
        In <strong>{state.stateName || stateName}</strong>, as of{' '}
        {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
        {worstCasesGroup} had the highest risk of contracting COVID-19 and were
        also most likely to have died.
      </>
    )
  }
  return (
    <>
      In <strong>{state.stateName || stateName}</strong>, as of{' '}
      {today.toLocaleString('default', { month: 'long' })} {today.getDate()},{' '}
      {worstCasesGroup} had the highest risk of contracting COVID-19.{' '}
      {worstDeathsGroup} were most likely to have died.
    </>
  )
}

const NoDataSocialCard = ({ stateName, square }) => {
  const today = new Date()
  return (
    <div>
      <div
        className={classnames(
          socialCardStyle.noDataContainer,
          square && socialCardStyle.square,
        )}
      >
        <img
          className={socialCardStyle.alert}
          src={alertIcon}
          alt="Alert icon"
        />
        <p>
          As of {today.toLocaleString('default', { month: 'long' })}{' '}
          {today.getDate()}, <strong>{stateName}</strong> did not report race
          and ethnicity data to allow for this comparison.
        </p>
        <p className={socialCardStyle.getBetterData}>
          Help us get better data:
          <br />
          <strong>www.covidtracking.com/race/get-better-data</strong>
        </p>
        {square && (
          <div className={socialCardStyle.logosContainer}>
            <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
            <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
          </div>
        )}
      </div>
      {!square && (
        <>
          <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
          <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
        </>
      )}
    </div>
  )
}

const StateRaceSocialCard = renderedComponent(
  ({ state, combinedStates, square = false }) => {
    // gets the width of the bar for the bar charts
    const getWidth = (number, max) =>
      `${number / max > 0.1 ? (number / max) * 100 : 10}%`

    // prepend 'The' to DC's name
    const stateName =
      state.stateName === 'District of Columbia'
        ? 'The District of Columbia'
        : state.stateName

    const groupValues = getGroups(state)
    const { groups } = groupValues

    const stateStatus = getStateStatus(state, combinedStates)

    if (stateStatus.deathsOnly) {
      groups.sort((a, b) => {
        // sort bars by # of deaths
        if (a.deaths >= b.deaths) {
          return -1
        }
        return 1
      })
    }

    if (stateStatus.noCharts) {
      return <NoDataSocialCard stateName={stateName} />
    }

    return (
      <div
        className={classnames(
          socialCardStyle.container,
          square && socialCardStyle.square,
        )}
      >
        <div
          className={classnames(
            socialCardStyle.grid,
            stateStatus.casesOnly && socialCardStyle.casesOnly,
            stateStatus.deathsOnly && socialCardStyle.deathsOnly,
          )}
        >
          {!square && <span />}
          {/*
            adds a spacer element to the grid, since the non-square
            header spans two columns, not all three
          */}
          <p className={socialCardStyle.header}>
            <SocialCardHeader state={state} />
          </p>
          <span /> {/* spacer for css grid */}
          {!stateStatus.deathsOnly && (
            <span
              className={classnames(
                socialCardStyle.casesHeader,
                socialCardStyle.barHeader,
              )}
            >
              Cases per 100,000 people
            </span>
          )}
          {!stateStatus.casesOnly && (
            <span
              className={classnames(
                socialCardStyle.deathsHeader,
                socialCardStyle.barHeader,
              )}
            >
              Deaths per 100,000 people
            </span>
          )}
          {/* justCases/justDeaths applies to each row, onlyCases/onlyDeaths
          applies to the whole state. i.e. if onlyCases is true, there will be
          only one chart for the state. If justCases is true, a single value
          will not be shown */}
          {groups.map(
            ({ label, style, cases, deaths, justCases, justDeaths }) => (
              <>
                <span className={socialCardStyle.barLabel}>{label}</span>
                {!stateStatus.deathsOnly && (
                  <>
                    {justDeaths ? (
                      <span className={socialCardStyle.insufficientData}>
                        No data reported
                      </span>
                    ) : (
                      <div
                        className={classnames(socialCardStyle.bar, style)}
                        style={{
                          width: getWidth(cases, groupValues.worstCasesValue),
                        }}
                      >
                        <FormatNumber number={cases} />
                      </div>
                    )}
                  </>
                )}
                {!stateStatus.casesOnly && (
                  <>
                    {justCases ? (
                      <span
                        className={classnames(
                          socialCardStyle.insufficientData,
                          socialCardStyle.insufficientDataDeaths,
                        )}
                      >
                        No data reported
                      </span>
                    ) : (
                      <div
                        className={classnames(
                          socialCardStyle.bar,
                          socialCardStyle.deathBar,
                          style,
                        )}
                        style={{
                          width: getWidth(deaths, groupValues.worstDeathsValue),
                        }}
                      >
                        <FormatNumber number={deaths} />
                      </div>
                    )}
                  </>
                )}
              </>
            ),
          )}
          <SocialCardFootnotes state={state} stateName={stateName} />
        </div>

        <img src={Logo} alt="" className={socialCardStyle.ctpLogo} />
        <img src={CarLogo} alt="" className={socialCardStyle.carLogo} />
      </div>
    )
  },
)

const SocialCardFootnotes = ({ state, stateName }) => {
  if (stateName === 'Utah') {
    // special case
    return (
      <p className={socialCardStyle.notes}>
        Utah has reported race and ethnicity data for{' '}
        <Percent number={state.knownRaceEthPos} /> of cases and{' '}
        <Percent number={state.knownRaceEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and are defined as not Hispanic or Latino.
      </p>
    )
  }
  if (stateName === 'Wyoming') {
    // special case
    return (
      <p className={socialCardStyle.notes}>
        Wyoming has reported race data for{' '}
        <Percent number={state.knownRacePos} /> of cases and{' '}
        <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity data
        for <Percent number={state.knownEthPos} /> of cases and{' '}
        <Percent number={state.knownEthDeath} /> of deaths. Graphic only
        includes demographic groups reported by the state. Race categories are
        non-mutually-exclusive and include both Hispanic/Latino and
        non-Hispanic/Latino ethnicity.
      </p>
    )
  }
  return (
    <p className={socialCardStyle.notes}>
      {state.knownRaceEthPos ? (
        <>
          {stateName} has reported race and ethnicity data for{' '}
          <Percent number={state.knownRaceEthPos} /> of cases and{' '}
          <Percent number={state.knownRaceEthDeath} /> of deaths. Graphic only
          includes demographic groups reported by the state. Race categories are
          mutually exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      ) : (
        <>
          {stateName} has reported race data for{' '}
          <Percent number={state.knownRacePos} /> of cases and{' '}
          <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity
          data for <Percent number={state.knownEthPos} /> of cases and{' '}
          <Percent number={state.knownEthDeath} /> of deaths. Graphic only
          includes demographic groups reported by the state. Race categories are
          non-mutually-exclusive and include both Hispanic/Latino and
          non-Hispanic/Latino ethnicity.
        </>
      )}{' '}
    </p>
  )
}

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
          apiPosPercap
          apiDeathPercap
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
          apiPosPercap
          apiDeathPercap
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
        <>
          <StateRaceSocialCard
            state={
              data.allCovidRaceDataSeparate.nodes.find(
                node => node.state === state.state,
              ) ||
              data.allCovidRaceDataCombined.nodes.find(
                node => node.state === state.state,
              )
            }
            combinedStates={combinedStates}
            renderOptions={{
              width: 900,
              height: 472.5,
              relativePath: 'race-dashboard',
              filename: `${state.childSlug.slug}`,
            }}
          />
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
              width: 700,
              height: 700,
              relativePath: 'race-dashboard',
              filename: `${state.childSlug.slug}-square`,
            }}
            square
          />
        </>
      ))}
    </>
  )
}

export default CreateStateRaceSocialCards

export { SocialCardHeader, getGroups, getTypeOfRates }
