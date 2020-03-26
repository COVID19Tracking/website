import React from 'react'
import Alert from '../common/alert'
import { StaticQuery, graphql } from 'gatsby'
import '../../scss/components/development-warning.scss'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            production
          }
        }
      }
    `}
    render={data => (
      <>
        {!data.site.siteMetadata.production && (
          <div class="development-warning">
            <Alert>
              This is a test version of The COVID Tracking Project website. Data
              may be inaccurate.{' '}
              <a href="http://covidtracking.com/">Visit the live site</a>
            </Alert>
          </div>
        )}
      </>
    )}
  />
)
