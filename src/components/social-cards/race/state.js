import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
// import { renderedComponent } from '~plugins/gatsby-render-components'
import slug from '~utilities/slug'
import Percent from '~components/pages/race/dashboard/percent'
import logo from '~images/project-logo-black.svg'
import style from './state.module.scss'

/* 
const State = renderedComponent(({ state }) => (
  <div className={style.container}>
    In {state.stateName}, confirmed COVID-19 cases among Black people are{' '}
    <strong>
      {Math.round((state.blackPctPos / state.whitePctPos) * 10) / 10} times
    </strong>{' '}
    the rate of white people.
  </div>
))
*/

const State = ({ state }) => (
  <div className={style.container}>
    <p className={style.header}>
      In <strong>{state.stateName}</strong>, infection and death rates among
      [[]] are higher than the overall population.
    </p>
    <div className={style.labels}>
      <ul>
        <li>Black</li>
        <li>Hispanic/Latino</li>
        <li>All</li>
        <li>Asian</li>
        <li>AIAN</li>
        <li>White</li>
        <li>NHPI</li>
      </ul>
    </div>
    <div className={style.caseBars}>
      <p className={style.barLabel}>Cases per 10,000 people</p>
      <div className={classnames(style.bar, style.barBlack)} />
      <div className={classnames(style.bar, style.barLatinx)} />
      <div className={classnames(style.bar, style.barAll)} />
      <div className={classnames(style.bar, style.barAsian)} />
      <div className={classnames(style.bar, style.barAian)} />
      <div className={classnames(style.bar, style.barWhite)} />
      <div className={classnames(style.bar, style.barNhpi)} />
    </div>
    <div className={style.deathBars}>
      <p className={style.barLabel}>Cases per 10,000 people</p>
      <div className={classnames(style.bar, style.barBlack)} />
      <div className={classnames(style.bar, style.barLatinx)} />
      <div className={classnames(style.bar, style.barAll)} />
      <div className={classnames(style.bar, style.barAsian)} />
      <div className={classnames(style.bar, style.barAian)} />
      <div className={classnames(style.bar, style.barWhite)} />
      <div className={classnames(style.bar, style.barNhpi)} />
    </div>
    {state.knownRaceEthPos ? (
      <p className={style.percent}>
        {state.stateName} has reported race and ethnicity data for{' '}
        <Percent number={state.knownRaceEthPos} /> of cases and{' '}
        <Percent number={state.knownRaceEthDeath} /> of deaths.
      </p>
    ) : (
      <p className={style.percent}>
        {state.stateName} has reported race for{' '}
        <Percent number={state.knownRacePos} /> of cases and{' '}
        <Percent number={state.knownRaceDeath} /> of deaths, and ethnicity data
        for <Percent number={state.knownEthPos} /> of cases and{' '}
        <Percent number={state.knownEthDeath} /> of deaths
      </p>
    )}
    <img src={logo} alt="" className={style.logo} />
  </div>
)

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
          whitePctPos
          blackPctDeath
          whitePctDeath
          nhpiPctPos
          nhpiPctDeath
          latinXPctPos
          latinXPctDeath
          asianPctPos
          asianPctDeath
          aianPctPos
          aianPctDeath
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
          whitePctPos
          blackPctDeath
          whitePctDeath
          nhpiPctPos
          nhpiPctDeath
          latinXPctPos
          latinXPctDeath
          asianPctPos
          asianPctDeath
          aianPctPos
          aianPctDeath
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
          population={data.allCovidStateInfo.nodes.find(
            node => node.state === state.state,
          )}
          renderOptions={{
            width: 500,
            height: 400,
            relativePath: 'race-dashboard',
            filename: `${slug(state.stateName)}`,
          }}
        />
      ))}
    </>
  )
}
