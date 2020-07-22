import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import RaceStateShare from '~share-cards/race/state'
import slug from '~utilities/slug'

export default ({ data }) => {
  const crdtStates = [
    ...data.allCovidRaceDataCombined.nodes,
    ...data.allCovidRaceDataSeparate.nodes,
  ]
  return (
    <Layout title="Social media cards">
      <RaceStateShare />
      <p>
        The following images are automatically updated, and are formatted for
        sharing our data in Social Media.
      </p>
      <h2>COVID Racial Data Tracker state cards</h2>
      <ul>
        {crdtStates.map(({ stateName }) => (
          <li key={`crdt-state-${stateName}`}>
            <a href={`/images/race-dashboard/${slug(stateName)}.png`}>
              {stateName}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
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
