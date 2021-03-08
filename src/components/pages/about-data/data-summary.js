import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
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

const Summary = ({ summary, hideTitle = false }) => (
  <div className={summaryStyle.summary} id={summary.slug}>
    {!hideTitle && (
      <h3 className={summaryStyle.header}>
        {summary.resources ? (
          <Link to={`/about-data/data-summary/${summary.slug}`}>
            {summary.title}
          </Link>
        ) : (
          <>{summary.title}</>
        )}
      </h3>
    )}
    <div
      dangerouslySetInnerHTML={{
        __html:
          summary.childContentfulDataSummaryDescriptionTextNode
            .childMarkdownRemark.html,
      }}
    />
    <ul className={summaryStyle.links}>
      <li>
        <a href={summary.sourceLink}>Data source</a>
      </li>
      {summary.downloadLink && (
        <li>
          <a href={summary.downloadLink}>Download data</a>
        </li>
      )}
      {summary.definitionsLink && (
        <li>
          <a href={summary.definitionsLink}>Definitions</a>
        </li>
      )}
    </ul>
    <h4 className={summaryStyle.header}>How to use it</h4>
    <div
      dangerouslySetInnerHTML={{
        __html:
          summary.childContentfulDataSummaryUseTextNode.childMarkdownRemark
            .html,
      }}
    />
  </div>
)

const DataSummary = ({ resources = false }) => {
  const data = useStaticQuery(graphql`
    {
      allContentfulDataSummaryCategory {
        nodes {
          title
          slug
          summaries {
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
              {(!resources || summaries.find(summary => summary.resources)) && (
                <li>
                  <strong>{title}</strong>
                  <ul>
                    {summaries.map(summary => (
                      <li>
                        <Link to={`#${summary.slug}`}>{summary.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </>
          ))}
          {resources && (
            <li>
              <strong>
                <Link to="#federal-trackers">Federal Trackers</Link>
              </strong>
            </li>
          )}
        </ul>
      </TableOfContentsWrapper>
      {categories.map(({ title, summaries }) => (
        <>
          {(!resources || summaries.find(summary => summary.resources)) && (
            <h2 className={summaryStyle.category}>{title}</h2>
          )}
          {summaries.map(summary => (
            <>
              {resources ? (
                <Resources summary={summary} />
              ) : (
                <Summary key={summary.slug} summary={summary} />
              )}
            </>
          ))}
        </>
      ))}
    </>
  )
}

export default DataSummary

export { Summary }
