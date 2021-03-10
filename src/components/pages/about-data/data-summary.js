import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { TableOfContentsWrapper } from '~components/common/table-of-contents'
import summaryStyle from './data-summary.module.scss'

const categoryOrder = [
  'testing-outcomes',
  'race-and-ethnicity',
  'long-term-care',
  'vaccine-metadata',
  'city-data',
  'miscellaneous-repositories',
]

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

const DataSummary = () => {
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
              id
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
      <TableOfContentsWrapper topMargin>
        <ul className={summaryStyle.toc}>
          {categories.map(({ title, summaries }) => (
            <>
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
            </>
          ))}
        </ul>
      </TableOfContentsWrapper>
      {categories.map(({ title, summaries }) => (
        <>
          <h2 className={summaryStyle.category}>{title}</h2>
          {summaries.map(summary => (
            <Summary key={summary.slug} summary={summary} />
          ))}
        </>
      ))}
    </>
  )
}

export default DataSummary

export { Summary }
