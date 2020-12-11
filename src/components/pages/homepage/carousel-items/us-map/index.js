/*eslint-disable */
import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Map from './map'
import Grid from './grid'

const List = ({ states, metric, us }) => (
  <div className="a11y-only">
    <Link to={`#skip-state-list-${metric}`}>Skip the list of states</Link>
    <ul>
      <li>
        <Link to={`/data/national`}>US total</Link>: {us.value}
      </li>
      {states.map(state => (
        <li>
          <Link to={`/data/state/${state.childSlug.slug}`}>{state.name}</Link>:{' '}
          {Math.round(state.value)}
        </li>
      ))}
    </ul>
    <div id={`skip-state-list-${metric}`} />
  </div>
)

const USMap = ({ configuration, item }) => {
  const { metric } = configuration
  const data = useStaticQuery(graphql`
    {
      allCovidStateInfo(sort: { fields: name }) {
        nodes {
          name
          state
          childSlug {
            slug
          }
        }
      }
      allCovidUsDaily(sort: { fields: date, order: DESC }) {
        nodes {
          positiveIncrease
          negativeIncrease
          childPopulation {
            population
            positive {
              per100k
            }
          }
        }
      }
      allCovidState {
        nodes {
          totalTestResults
          positive
          death
          state
        }
      }
      covidUs {
        totalTestResults
        positive
        death
      }
      allCovidStateDaily(sort: { fields: [state, date], order: [ASC, DESC] }) {
        group(field: state, limit: 7) {
          nodes {
            state
            positiveIncrease
            negativeIncrease
            childPopulation {
              population
              positive {
                per100k
              }
            }
          }
        }
      }
    }
  `)

  const getAverage = (state, value) =>
    data.allCovidStateDaily.group
      .find(group => group.nodes[0].state === state)
      .nodes.reduce((total, item) => total + value(item), 0) / 7

  const states = data.allCovidStateInfo.nodes.map(state => {
    let value = 0
    if (metric === 'casesPer100k') {
      value = getAverage(
        state.state,
        state => state.childPopulation.positive.per100k,
      )
    }
    if (metric === 'sevenDayPositive') {
      value = getAverage(state.state, state => state.positiveIncrease)
    }
    return {
      ...state,
      current: data.allCovidState.nodes.find(row => row.state === state.state),
      value,
    }
  })
  let usValue = 0
  const us = {
    current: data.covidUs,
    value: usValue,
  }

  return (
    <>
      <Map states={states} metric={metric} us={us} />
      <Grid states={states} metric={metric} us={us} />
      <List states={states} metric={metric} us={us} />
      <svg aria-hidden>
        <filter id="dropshadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dropshadow-large">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="0" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    </>
  )
}

export default USMap
