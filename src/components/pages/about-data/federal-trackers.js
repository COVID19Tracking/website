import React from 'react'
import slugify from 'slugify'
import { graphql, useStaticQuery } from 'gatsby'
import summaryStyle from './data-summary.module.scss'

const FederalTrackers = () => {
  const data = useStaticQuery(graphql`
    {
      allContentfulFederalTrackers {
        nodes {
          agency
          description {
            childMarkdownRemark {
              html
            }
          }
          createdAt(formatString: "MMMM D, yyyy")
          format
          link
          name
        }
      }
      allContentfulFederalDataPortal {
        nodes {
          apIs
          covid19Data
          link
          name
          description {
            childMarkdownRemark {
              html
            }
          }
          about
        }
      }
    }
  `)

  return (
    <>
      <h2 id="federal-trackers" className={summaryStyle.category}>
        Federal trackers
      </h2>
      {data.allContentfulFederalTrackers.nodes.map(summary => (
        <>
          <h3 id={slugify(summary.name, { lower: true })}>{summary.name}</h3>
          <ul>
            {summary.format && (
              <li>
                <strong>Format:</strong> {summary.format}
              </li>
            )}
            {summary.agency && (
              <li>
                <strong>Agency:</strong> {summary.agency}
              </li>
            )}
            {summary.link && (
              <li>
                <strong>
                  <a href={summary.link}>
                    Link<span className="a11y-only">to {summary.name}</span>
                  </a>
                </strong>
              </li>
            )}
          </ul>
          {summary.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: summary.description.childMarkdownRemark.html,
              }}
            />
          )}
        </>
      ))}
      <h2 id="federal-portals" className={summaryStyle.category}>
        Federal data portals
      </h2>
      {data.allContentfulFederalDataPortal.nodes.map(summary => (
        <>
          <h3 id={slugify(summary.name, { lower: true })}>{summary.name}</h3>
          <ul>
            {summary.link && (
              <li>
                <strong>
                  <a href={summary.link}>
                    Link<span className="a11y-only"> for {summary.name}</span>
                  </a>
                </strong>
              </li>
            )}
            {summary.about && (
              <li>
                <strong>
                  <a href={summary.about}>
                    About<span className="a11y-only"> for {summary.name}</span>
                  </a>
                </strong>
              </li>
            )}
            {summary.covid19Data && (
              <li>
                <strong>
                  <a href={summary.covid19Data}>
                    COVID-19 data
                    <span className="a11y-only"> for {summary.name}</span>
                  </a>
                </strong>
              </li>
            )}
            {summary.apIs && (
              <li>
                <strong>
                  <a href={summary.apIs}>
                    APIs<span className="a11y-only"> for {summary.name}</span>
                  </a>
                </strong>
              </li>
            )}
          </ul>
          {summary.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: summary.description.childMarkdownRemark.html,
              }}
            />
          )}
        </>
      ))}
    </>
  )
}

export default FederalTrackers
