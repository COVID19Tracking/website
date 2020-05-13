import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'

export default ({ data }) => (
  <Layout
    title="Racial Data dashboard"
    description="The COVID-19 pandemic isn’t affecting all communities the same way. The COVID Racial Data Dashboard helps us track this inequity by publishing topline racial data compared with state demographic data."
  >
    {data.allCovidStateInfo.edges.map(({ node }) => (
      <h3>{node.name}</h3>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allCovidStateInfo(sort: { fields: name }) {
      edges {
        node {
          name
          state
        }
      }
    }
  }
`
