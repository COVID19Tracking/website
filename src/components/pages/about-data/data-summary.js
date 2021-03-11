import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import { TableOfContentsWrapper } from '~components/common/table-of-contents'
import { Resource } from './data-summary-resources'
import summaryStyle from './data-summary.module.scss'

const categoryOrder = [
  'testing-outcomes',
  'race-and-ethnicity',
  'long-term-care',
  'vaccine-metadata',
  'city-data',
  'miscellaneous-repositories',
]

const DatasetResource = ({ resource }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Disclosure open={isOpen} onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={summaryStyle.disclosureButton}>
        {resource.name}
        <span aria-hidden>{isOpen ? <>↑</> : <>↓</>}</span>
      </DisclosureButton>
      <DisclosurePanel className={summaryStyle.disclosurePanel}>
        <Resource resource={resource} hideTitle={false} />
      </DisclosurePanel>
    </Disclosure>
  )
}

const Summary = ({ summary }) => (
  <div className={summaryStyle.summary} id={summary.slug}>
    <h3 className={summaryStyle.header}>{summary.title}</h3>
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
    {summary.resources && (
      <>
        <h4>Related federal data</h4>
        {summary.resources.map(resource => (
          <DatasetResource resource={resource} />
        ))}
      </>
    )}
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
              contentful_id
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
