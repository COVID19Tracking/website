import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'

const BuildPage = ({ data }) => (
  <Layout title="Build">
    <p>
      <strong>Build time</strong> {data.site.siteMetadata.buildTime}
    </p>
    <p>
      <strong>Build ID</strong>{' '}
      <code>{data.site.siteMetadata.buildId || 'N/A'}</code>
    </p>
    <p>
      <strong>Build hook</strong>{' '}
      <code>{data.site.siteMetadata.buildHook || 'N/A'}</code>
    </p>
  </Layout>
)

export default BuildPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        buildTime
        buildId
        buildHook
      }
    }
  }
`
