import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '~components/layout/internal'

export default ({ data }) => (
  <Layout title="State data">
    <h2>Last API data</h2>
    <p>
      <strong>Build time</strong> {data.v1Json.buildTime}
      <br />
      <strong>Build number</strong> <code>{data.v1Json.runNumber}</code>
    </p>
    <h2>States</h2>
    <ul>
      {data.allCovidStateInfo.nodes.map(state => (
        <li key={state.state}>
          <Link to={`/internal/state/${state.state.toLowerCase()}`}>
            {state.state} - {state.name}
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    v1Json {
      buildTime
      runNumber
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        name
        state
        notes
        covid19Site
        covid19SiteSecondary
        twitter
      }
    }
  }
`
