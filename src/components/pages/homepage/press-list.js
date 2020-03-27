import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    {
      allCovidPress(
        filter: {
          addToCovidTrackingProjectWebsite: { eq: true }
          title: { ne: "null" }
        }
        sort: { fields: publishDate, order: DESC }
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
          <a href={node.url}>{node.title}</a> — <em>{node.publication}</em>,{' '}
          {node.publishDate}
        </li>
      ))}
    </ul>
  )
}
