/*eslint-disable */
import React from 'react'
import slugify from 'slugify'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { DateTime } from 'luxon'
import metrics from './metrics'
import Map from './map'
import Grid from './grid'
import Title from '../../components/title'

const Table = ({ states, metric, us }) => (
  <div className="a11y-only">
    <Link to={`#skip-state-list-${slugify(metric.title)}`}>
      Skip the list of states
    </Link>
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>{metric.title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>National total</td>
          <td>{Math.round(us.value)}</td>
        </tr>
        {states.map(state => (
          <tr>
            <td>
              <Link to={`/data/state/${state.childSlug.slug}`}>
                {state.name}
              </Link>
            </td>
            <td>{Math.round(state.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div id={`skip-state-list-${slugify(metric.title)}`} />
  </div>
)

const USMap = ({ configuration, item }) => {
  const { metric } = configuration
  const data = useStaticQuery(graphql`
    {
      lastUpdate: allCovidUsDaily(
        sort: { fields: date, order: DESC }
        limit: 1
      ) {
        nodes {
          date(formatString: "MMMM D, YYYY")
          isoDate: date
        }
      }
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
          hospitalizedCurrently
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
        group(field: state, limit: 90) {
          nodes {
            date
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

  const states = data.allCovidStateInfo.nodes.map(state => {
    return {
      ...state,
      current: data.allCovidState.nodes.find(row => row.state === state.state),
      value: metrics[metric].getValue(data.allCovidStateDaily.group, state),
      history: data.allCovidStateDaily.group.find(
        group => group.nodes[0].state === state.state,
      ).nodes,
    }
  })
  const us = {
    current: data.covidUs,
    value: metrics[metric].getUsValue(data.allCovidUsDaily.nodes),
  }

  const lastUpdate = data.lastUpdate.nodes[0].date
  const sevenDaysAgo = DateTime.fromISO(data.lastUpdate.nodes[0].isoDate)
    .minus({ days: 7 })
    .toFormat('MMMM d, yyyy')
  return (
    <>
      <Map
        states={states}
        metric={metrics[metric]}
        us={us}
        relatedPost={item.relatedPost}
        title={
          <Title title={metrics[metric].title}>
            From {sevenDaysAgo} to {lastUpdate}
          </Title>
        }
      />
      <Grid
        states={states}
        metric={metrics[metric]}
        us={us}
        relatedPost={item.relatedPost}
      />
      <Table states={states} metric={metrics[metric]} us={us} />
    </>
  )
}

export default USMap
