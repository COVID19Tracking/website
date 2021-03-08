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
          createdAt(formatString: "MMMM dd, yyyy")
          format
          link
          name
        }
      }
    }
  `)

  return (
    <div id="federal-trackers">
      <h2 className={summaryStyle.category}>Federal trackers</h2>
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
    </div>
  )
}

export default FederalTrackers
