import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../../../scss/components/pages/homepage/press-list.scss'

export default () => {
  const data = useStaticQuery(graphql`
    {
      allCovidPress(
        filter: {
          addToCovidTrackingProjectWebsite: { eq: true }
          title: { ne: "null" }
        }
        sort: { fields: publishDate, order: DESC }
        limit: 4
      ) {
        edges {
          node {
            title
            url
            publication
            publishDate(formatString: "MMMM D YYYY")
          }
        }
      }
    }
  `)
  return (
    <ul className="press-list">
      {data.allCovidPress.edges.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          <a href={node.url}>{node.title}</a>
          <div>
            <em>{node.publication}</em>, {node.publishDate}
          </div>
        </li>
      ))}
    </ul>
  )
}
