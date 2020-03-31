import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../../../scss/components/pages/homepage/press-logos.scss'

export default ({ onlyFeatured }) => {
  const data = useStaticQuery(graphql`
    query {
      allHomepagePressYaml {
        edges {
          node {
            name
            logo
            width
            featured
          }
        }
      }
    }
  `)

  return (
    <div className="homepage-press-logos">
      {data.allHomepagePressYaml.edges.map(({ node }) => (
        <React.Fragment key={node.name}>
          {(!onlyFeatured || node.featured) && (
            <img
              key={`homepage-press-${node.name}`}
              alt={`${node.name} logo`}
              src={`/images/press-logos/${node.logo}`}
              style={
                node.width && {
                  width: `${onlyFeatured ? node.width + 50 : node.width}px`,
                }
              }
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
