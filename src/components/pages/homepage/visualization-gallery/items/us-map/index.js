/*eslint-disable */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { DateTime } from 'luxon'
import metrics from './metrics'
import Map from './map'
import Grid from './grid'
import Table from './table'
import Title from '../../components/title'
import { MetricContext, SvgFilters } from './drop-shadow'

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
            hospitalizedCurrently {
              percent
            }
            positive {
              per100k
            }
            positiveIncrease {
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
        hospitalizedCurrently
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
                percent
              }
              hospitalizedCurrently {
                percent
              }
              positiveIncrease {
                per100k
                percent
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
    <MetricContext.Provider value={{ metric: metric }}>
      <SvgFilters />
      <Map
        states={states}
        metric={metrics[metric]}
        us={us}
        relatedPost={item.relatedPost}
        title={
          <Title title={metrics[metric].title}>
            {metrics[metric].subTitle(lastUpdate, sevenDaysAgo)}
          </Title>
        }
        disclaimer={
          item.childContentfulHomepageGalleryItemDataDisclaimerTextNode
        }
      />
      <Grid
        states={states}
        metric={metrics[metric]}
        us={us}
        relatedPost={item.relatedPost}
        disclaimer={
          item.childContentfulHomepageGalleryItemDataDisclaimerTextNode
        }
      />
      <Table states={states} metric={metrics[metric]} us={us} />
    </MetricContext.Provider>
  )
}

export default USMap
