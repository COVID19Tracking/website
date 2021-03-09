import React from 'react'
import { graphql } from 'gatsby'
import { Summary } from '~components/pages/about-data/data-summary'
import DataSummaryResources from '~components/pages/about-data/data-summary-resources'
import Layout from '../components/layout'

const DataSummaryPage = ({ data, path }) => {
  return (
    <Layout
      title={data.contentfulDataSummary.title}
      path={path}
      returnLinks={[
        { link: '/about-data' },
        { link: '/about-data/data-summary', title: 'All Datasets' },
      ]}
      centered
    >
      <Summary hideTitle summary={data.contentfulDataSummary} />
      <h2>Where to find this data</h2>
      <DataSummaryResources resources={data.contentfulDataSummary.resources} />
    </Layout>
  )
}

export default DataSummaryPage

export const query = graphql`
  query($id: String!) {
    contentfulDataSummary(id: { eq: $id }) {
      id
      title
      slug
      sourceLink
      downloadLink
      definitionsLink
      childContentfulDataSummaryUseTextNode {
        childMarkdownRemark {
          html
        }
      }
      childContentfulDataSummaryDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
      resources {
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
