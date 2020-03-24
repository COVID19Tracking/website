import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            buildDate
          }
        }
      }
    `}
    render={data => (
      <p className="build-time">
        Last synced with our spreadsheet: {data.site.siteMetadata.buildDate}
      </p>
    )}
  />
)
