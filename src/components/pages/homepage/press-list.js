import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allCovidPress(
        filter: { featureOnCovidTrackingProjectHomepage: { eq: true } }
        sort: { fields: publishDate, order: DESC }
      ) {
        edges {
          node {
            id
            title
            url
            publication
          }
        }
      }
    }
  `)
  return (
    <ul className="press-list">
      {data.allCovidPress.edges.map(({ node }) => (
        <li key={`homepage-press-${node.id}`}>
          {node.publication} - <a href={node.url}>{node.title}</a>
        </li>
      ))}
    </ul>
  )
}
