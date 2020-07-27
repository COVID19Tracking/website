/* eslint-disable no-unused-vars */
import React from 'react'
import { graphql } from 'gatsby'
// import Layout from '~components/layout'
import RaceSocialCards from '~components/social-cards/race/state'

export default ({ data }) => {
  const states = [
    ...data.allCovidRaceDataCombined.nodes,
    ...data.allCovidRaceDataSeparate.nodes,
  ]
  return <RaceSocialCards />
}

export const query = graphql`
  {
    allCovidRaceDataCombined(filter: { state: { ne: "US" } }) {
      nodes {
        stateName
      }
    }
    allCovidRaceDataSeparate(filter: { state: { ne: "US" } }) {
      nodes {
        stateName
      }
    }
  }
`
