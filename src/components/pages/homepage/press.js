import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import pressStyles from './press.module.scss'

const HomepagePress = () => {
  const data = useStaticQuery(graphql`
    query {
      allHomepagePressYaml {
        nodes {
          name
          logo
          width
          featured
        }
      }
    }
  `)

  return (
    <section className={pressStyles.section}>
      <h3 className={pressStyles.header}>Who&#8217;s using our data</h3>
      <div className={pressStyles.logos}>
        <p className="a11y-only">
          News organizations including The New York Times, The Washington Post,
          CNN, Vox, ProPublica, and The Wall Street Journal use our data in
          their reporting.
        </p>
        {data.allHomepagePressYaml.nodes.map(node => (
          <img
            key={`homepage-press-${node.name}`}
            alt={`${node.name} logo`}
            src={`/images/press-logos/${node.logo}`}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}

export default HomepagePress
