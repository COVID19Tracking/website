import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import { renderedComponent } from '~plugins/gatsby-render-components'
import slug from '~utilities/slug'
import Percent from '~components/pages/race/dashboard/percent'
import { stringifyList } from '~utilities/list-formatter'
import logo from '~images/project-logo-black.svg'
import socialCardStyle from './state.module.scss'

const State = renderedComponent(({ state, population }) => {
  const getField = (field, type) => {
    if (field === 'all') {
      return null
    }
    if (!state[field + type]) {
      return 0
    }
    return Math.round(
      (parseInt(state[field + type], 10) /
        (parseFloat(state[`${field}PctPop`]) * population)) *
        100000,
    )
  }

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

  const groups = [
    {
      label: 'Black',
      style: socialCardStyle.barBlack,
      cases: getField('black', 'Positives'),
      deaths: getField('black', 'Deaths'),
    },
    {
      label: 'Hispanic/Latino',
      style: socialCardStyle.barLatinx,
      cases: getField('latinX', 'Positives'),
      deaths: getField('latinX', 'Deaths'),
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
      cases: getField('asian', 'Positives'),
      deaths: getField('asian', 'Deaths'),
    },
    {
      label: 'AIAN',
      style: socialCardStyle.barAian,
      cases: getField('aian', 'Positives'),
      deaths: getField('aian', 'Deaths'),
    },
    {
      label: 'White',
      style: socialCardStyle.barWhite,
      cases: getField('white', 'Positives'),
      deaths: getField('white', 'Deaths'),
    },
    {
      label: 'NHPI',
      style: socialCardStyle.barNhpi,
      cases: getField('nhpi', 'Positives'),
      deaths: getField('nhpi', 'Deaths'),
    },
  ]

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
    if (a.cases >= b.cases) {
      return -1
    }
    return 1
  })

  const getWidth = (number, max) =>
    `${number / max > 0.1 ? (number / max) * 100 : 10}%`

  return (
    <div className={socialCardStyle.container}>
      <p className={socialCardStyle.header}>
        In <strong>{state.stateName}</strong>,{' '}
        {affectedGroups && affectedGroups.length ? (
          <>
            infection and death rates among{' '}
            {stringifyList({ arr: affectedGroups })} are higher than the overall
            population.
          </>
        ) : (
          <>
            there are no groups with higher infection and death rates than the
            overall population.
          </>
        )}
      </p>
      <div className={socialCardStyle.labels}>
        <ul>
          {groups.map(({ label }) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </div>
      <div className={socialCardStyle.caseBars}>
        <p className={socialCardStyle.barLabel}>Cases per 10,000 people</p>
        {groups.map(({ style, cases }) => (
          <div
            className={classnames(socialCardStyle.bar, style)}
            style={{ width: getWidth(cases, largestCases) }}
          >
            {cases}
          </div>
        ))}
      </div>
      <div className={socialCardStyle.deathBars}>
        <p className={socialCardStyle.barLabel}>Deaths per 10,000 people</p>
        {groups.map(({ style, deaths }) => (
          <div
            className={classnames(socialCardStyle.bar, style)}
            style={{ width: getWidth(deaths, largestDeaths) }}
          >
            {deaths}
          </div>
        ))}
      </div>
      {state.knownRaceEthPos ? (
        <p className={socialCardStyle.percent}>
          {state.stateName} has reported race and ethnicity data for{' '}
          <Percent number={state.knownRaceEthPos} /> of cases and{' '}
          <Percent number={state.knownRaceEthDeath} /> of deaths.
        </p>
      ) : (
        <p className={socialCardStyle.percent}>
          {state.stateName} has reported race for{' '}
          <Percent number={state.knownRacePos} /> of cases and{' '}
          <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity
          data for <Percent number={state.knownEthPos} /> of cases and{' '}
          <Percent number={state.knownEthDeath} /> of deaths
        </p>
      )}
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
          blackPctPop
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctPop
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPctPop
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPctPop
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPctPop
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPctPop
          aianPositives
          aianDeaths
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
          blackPctPop
          blackPctPos
          blackPctDeath
          blackPositives
          blackDeaths
          whitePctPos
          whitePctPop
          whitePctDeath
          whitePositives
          whiteDeaths
          nhpiPctPos
          nhpiPctDeath
          nhpiPctPop
          nhpiPositives
          nhpiDeaths
          latinXPctPos
          latinXPctDeath
          latinXPctPop
          latinXPositives
          latinXDeaths
          asianPctPos
          asianPctDeath
          asianPctPop
          asianPositives
          asianDeaths
          aianPctPos
          aianPctDeath
          aianPctPop
          aianPositives
          aianDeaths
        }
      }
      allCovidStateInfo {
        nodes {
          state
          childPopulation {
            population
          }
        }
      }
    }
  `)
  const states = [
    ...data.allCovidRaceDataCombined.nodes,
    ...data.allCovidRaceDataSeparate.nodes,
  ]

  return (
    <>
      {states.map(state => (
        <State
          state={state}
          population={
            data.allCovidStateInfo.nodes.find(
              node => node.state === state.state,
            ).childPopulation.population
          }
          renderOptions={{
            width: 1200,
            height: 600,
            relativePath: 'race-dashboard',
            filename: `${slug(state.stateName)}`,
          }}
        />
      ))}
    </>
  )
}
