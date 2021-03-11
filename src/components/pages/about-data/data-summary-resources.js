import React from 'react'
import { Link } from 'gatsby'
import slugify from 'slugify'
import Img from 'gatsby-image'
import dataSummaryStyle from './data-summary.module.scss'

const aboutFields = [
  { name: 'Agency', field: 'agency' },
  { name: 'Start date', field: 'startDate' },
  { name: 'Timeseries unit', field: 'timeseriesUnit' },
  { name: 'Geographic units', field: 'geographicUnits' },
  { name: 'Update frequency', field: 'updateFrequency' },
  { name: 'Data page link', field: 'linkUrl', link: true },
  { name: 'Download link', field: 'downloadLinkUrl', link: true },
  { name: 'Query link', field: 'queryLink', link: true },
  { name: 'Chart link', field: 'chartLink', link: true },
]

const Resource = ({ resource, showSummaries, showName = true }) => (
  <div className={dataSummaryStyle.resource}>
    {showName && (
      <h3 id={slugify(resource.name, { lower: true })}>{resource.name}</h3>
    )}
    <h4>About</h4>
    <ul className={dataSummaryStyle.definitions}>
      {aboutFields.map(({ name, field, link }) => (
        <>
          {resource[field] && (
            <li>
              {link ? (
                <>
                  <strong>
                    <a href={resource[field]}>
                      {name}
                      <span className="a11y-only">for {resource.name}</span>
                    </a>
                  </strong>
                </>
              ) : (
                <>
                  <strong>{name}:</strong>
                  {resource[field]}
                </>
              )}
            </li>
          )}
        </>
      ))}
    </ul>
    <h4>Description</h4>
    <div
      dangerouslySetInnerHTML={{
        __html: resource.description.childMarkdownRemark.html,
      }}
    />
    <p className={dataSummaryStyle.lastUpdated}>
      Last updated {resource.updatedAt}
    </p>
    {resource.screenshots && (
      <>
        {resource.screenshots.map(screenshot => (
          <Img fluid={screenshot.fluid} alt={screenshot.description} />
        ))}
      </>
    )}
    {showSummaries && resource.data_summary && (
      <>
        <h4 className={dataSummaryStyle.relatedPosts}>Our related datasets</h4>
        <ul>
          {resource.data_summary.map(summary => (
            <li>
              <Link to={`/about-data/data-summary#${summary.slug}`}>
                {summary.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    )}
    {(resource.relatedPosts || resource.youtubeVideoTitle) && (
      <>
        <h4 className={dataSummaryStyle.relatedPosts}>Our related posts</h4>
        <ul>
          {resource.relatedPosts && (
            <>
              {resource.relatedPosts.map(post => (
                <li>
                  <Link
                    to={
                      post.sys.contentType.sys.id === 'blog'
                        ? `/analysis-updates/${post.slug}`
                        : `/${post.slug}`
                    }
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </>
          )}
          {resource.youtubeVideoTitle && (
            <li>
              <a href={resource.youtubeVideoUrl}>
                {resource.youtubeVideoTitle}
              </a>
            </li>
          )}
        </ul>
      </>
    )}
  </div>
)

const DataSummaryResources = ({ resources, showSummaries = true }) => {
  if (!resources) {
    return null
  }
  return (
    <>
      {resources.map(resource => (
        <Resource resource={resource} showSummaries={showSummaries} />
      ))}
    </>
  )
}

export default DataSummaryResources

export { Resource }
