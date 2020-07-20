import React from 'react'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'

const ScrollyTelling = loadable(() =>
  import('~components/pages/experiments/scrollytelling'),
)

export default ({ data }) => <ScrollyTelling data={data} />

export const query = graphql`
  query {
    allCovidUsDaily {
      nodes {
        date
        totalTestResultsIncrease
        positiveIncrease
        hospitalizedCurrently
        deathIncrease
        childPopulation {
          deathIncrease {
            percent
          }
          hospitalizedCurrently {
            percent
          }
          positiveIncrease {
            percent
          }
          totalTestResultsIncrease {
            percent
          }
        }
      }
    }
  }
`
