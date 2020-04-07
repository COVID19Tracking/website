import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import pressLogoStyles from '../../../scss/components/pages/homepage/press-logos.module.scss'

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
    <div className={`homepage-press-logos ${pressLogoStyles.logos}`}>
      {data.allHomepagePressYaml.edges.map(({ node }) => (
        <React.Fragment key={node.name}>
          {(!onlyFeatured || node.featured) && (
            <img
              key={`homepage-press-${node.name}`}
              alt={`${node.name} logo`}
              src={`/images/press-logos/${node.logo}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
