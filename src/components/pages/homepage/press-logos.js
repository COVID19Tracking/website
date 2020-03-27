import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../../../scss/components/pages/homepage/press-logos.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allHomepagePressYaml {
        edges {
          node {
            name
            logo
            width
          }
        }
      }
    }
  `)

  return (
    <p className="homepage-press-logos">
      {data.allHomepagePressYaml.edges.map(({ node }) => (
        <img
          key={`homepage-press-${node.name}`}
          alt={`${node.name} logo`}
          src={`/images/press-logos/${node.logo}`}
          style={node.width && { width: `${node.width}px` }}
        />
      ))}
    </p>
  )
}
