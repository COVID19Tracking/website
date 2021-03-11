import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import slugify from 'slugify'
import { TableOfContentsWrapper } from '~components/common/table-of-contents'
import DataSummaryResources from '~components/pages/about-data/data-summary-resources'
import summaryStyle from './data-summary.module.scss'

const categoryOrder = [
  'testing-outcomes',
  'race-and-ethnicity',
  'long-term-care',
  'vaccine-metadata',
  'city-data',
  'miscellaneous-repositories',
]

const Resources = ({ summary }) => {
  if (!summary.resources) {
    return null
  }
  return <DataSummaryResources resources={summary.resources} showSummaries />
}

const FederalResources = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulDataSummaryCategory {
        nodes {
          title
          slug
          summaries {
            title
            slug
            resources {
              contentful_id
              name
              updatedAt(formatString: "MMMM D, yyyy")
              linkUrl
              downloadLinkUrl
              description {
                childMarkdownRemark {
                  html
                }
              }
              data_summary {
                title
                slug
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
              startDate(formatString: "MMMM D, yyyy")
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
      }
      allContentfulFederalTrackers {
        nodes {
          name
        }
      }
      allContentfulFederalDataPortal {
        nodes {
          name
        }
      }
    }
  `)

  const categories = categoryOrder.map(slug => {
    const result = data.allContentfulDataSummaryCategory.nodes.find(
      node => node.slug === slug,
    )
    result.summaries.forEach((summary, summaryIndex) => {
      if (summary.resources) {
        summary.resources.forEach((resource, resourceIndex) => {
          result.summaries.forEach((otherSummary, otherSummaryIndex) => {
            if (otherSummary.resources) {
              otherSummary.resources.forEach(otherResource => {
                if (
                  otherSummaryIndex !== summaryIndex &&
                  otherResource.contentful_id === resource.contentful_id
                ) {
                  delete result.summaries[summaryIndex].resources[resourceIndex]
                }
              })
            }
          })
        })
      }
    })
    return result
  })

  return (
    <>
      <TableOfContentsWrapper topMargin>
        <ul className={summaryStyle.toc}>
          {categories.map(({ title, slug, summaries }) => (
            <>
              {summaries && summaries.find(summary => summary.resources) && (
                <li>
                  <strong>
                    <Link to={`#${slug}`}>{title}</Link>
                  </strong>
                  <ul>
                    {summaries.map(summary => (
                      <>
                        {summary.resources &&
                          summary.resources.map(resource => (
                            <li>
                              <Link
                                to={`#${slugify(resource.name, {
                                  lower: true,
                                })}`}
                              >
                                {resource.name}
                              </Link>
                            </li>
                          ))}
                      </>
                    ))}
                  </ul>
                </li>
              )}
            </>
          ))}
          <li>
            <strong>
              <Link to="#federal-trackers">Federal trackers</Link>
            </strong>
            <ul>
              {data.allContentfulFederalTrackers.nodes.map(tracker => (
                <li>
                  <Link to={`#${slugify(tracker.name, { lower: true })}`}>
                    {tracker.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <strong>
              <Link to="#federal-portals">Federal data portals</Link>
            </strong>
            <ul>
              {data.allContentfulFederalDataPortal.nodes.map(tracker => (
                <li>
                  <Link to={`#${slugify(tracker.name, { lower: true })}`}>
                    {tracker.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </TableOfContentsWrapper>
      {categories.map(({ title, slug, summaries }) => (
        <>
          {summaries && summaries.find(summary => summary.resources) && (
            <>
              <h2 className={summaryStyle.category} id={slug}>
                {title}
              </h2>
              {summaries.map(summary => (
                <Resources summary={summary} />
              ))}
            </>
          )}
        </>
      ))}
    </>
  )
}

export default FederalResources
