import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import pressLogoStyles from './press-logos.module.scss'

export default ({ onlyFeatured, extraMargin }) => {
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
    <div
      className={`homepage-press-logos ${pressLogoStyles.logos} ${extraMargin &&
        pressLogoStyles.extraMargin}`}
    >
      <p className="a11y-only">
        News organizations including The New York Times, The Washington Post,
        CNN, Vox, ProPublica, and The Wall Street Journal use our data in their
        reporting.
      </p>
      {data.allHomepagePressYaml.edges.map(({ node }) => (
        <React.Fragment key={node.name}>
          {(!onlyFeatured || node.featured) && (
            <img
              key={`homepage-press-${node.name}`}
              alt={`${node.name} logo`}
              src={`/images/press-logos/${node.logo}`}
              aria-hidden
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
