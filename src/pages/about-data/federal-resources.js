import React from 'react'
import { graphql } from 'gatsby'
import DataSummaryResources from '~components/pages/about-data/data-summary-resources'
import Layout from '~components/layout'

const FederalResourcesPage = ({ data }) => (
  <Layout title="Federal Resources" centered>
    <DataSummaryResources
      resources={data.allContentfulDataSummaryResource.nodes}
    />
  </Layout>
)

export default FederalResourcesPage

export const query = graphql`
  {
    allContentfulDataSummaryResource {
      nodes {
        name
        updatedAt(formatString: "MMMM d, yyyy")
        linkUrl
        downloadLinkUrl
        description {
          childMarkdownRemark {
            html
          }
        }
        relatedPosts {
          title
          slug
          sys {
            contentType {
              sys {
                id
              }
            }
          }
        }
        agency
        chartLink
        geographicUnits
        queryLink
        startDate(formatString: "MMMM d, yyyy")
        timeseriesUnit
        updateFrequency
        youtubeVideoTitle
        youtubeVideoUrl
        screenshots {
          description
          fluid(maxWidth: 2000, sizes: "4") {
            aspectRatio
            sizes
            src
            srcSet
          }
        }
      }
    }
  }
`
