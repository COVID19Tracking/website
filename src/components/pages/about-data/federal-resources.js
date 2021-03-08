import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import slugify from 'slugify'
import { TableOfContentsWrapper } from '~components/common/table-of-contents'
import DataSummaryResources from '~components/pages/about-data/data-summary-resources'
import summaryStyle from './data-summary.module.scss'

const categoryOrder = [
  'testing-outcomes',
  'long-term-care',
  'vaccine-metadata',
  'city-data',
  'miscellaneous-repositories',
]

const Resources = ({ summary }) => {
  if (!summary.resources) {
    return null
  }
  return (
    <div className={summaryStyle.summary} id={summary.slug}>
      <h3 className={summaryStyle.header}>{summary.title}</h3>
      <DataSummaryResources resources={summary.resources} />
    </div>
  )
}

const FederalResources = ({ resources = false }) => {
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

  const categories = categoryOrder.map(slug =>
    data.allContentfulDataSummaryCategory.nodes.find(
      node => node.slug === slug,
    ),
  )

  return (
    <>
      <TableOfContentsWrapper>
        <ul className={summaryStyle.toc}>
          {categories.map(({ title, summaries }) => (
            <>
              {summaries && summaries.find(summary => summary.resources) && (
                <li>
                  <strong>{title}</strong>
                  <ul>
                    {summaries.map(summary => (
                      <>
                        {summary.resources &&
                          summary.resources.map(resource => (
                            <li>
                              <Link to={`#${resource.slug}`}>
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
            <strong>Federal Trackers</strong>
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
            <strong>Federal Data Portals</strong>
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
      {categories.map(({ title, summaries }) => (
        <>
          {(!resources || summaries.find(summary => summary.resources)) && (
            <h2 className={summaryStyle.category}>{title}</h2>
          )}
          {summaries.map(summary => (
            <Resources summary={summary} />
          ))}
        </>
      ))}
    </>
  )
}

export default FederalResources
