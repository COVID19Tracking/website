import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import pressStyles from './press.module.scss'

const HomepagePress = () => {
  const data = useStaticQuery(graphql`
    query {
      allHomepagePressYaml(filter: { featured: { eq: true } }) {
        nodes {
          name
          logo
        }
      }
      allFile(filter: { dir: { regex: "/press-logos/" } }) {
        nodes {
          name
          publicURL
        }
      }
    }
  `)

  return (
    <section className={pressStyles.section}>
      <h2 className={pressStyles.header}>Who uses our data?</h2>
      <div className={pressStyles.logos}>
        <p className="a11y-only">
          News organizations including The New York Times, The Washington Post,
          CNN, Vox, ProPublica, and The Wall Street Journal use our data in
          their reporting.
        </p>
        {data.allHomepagePressYaml.nodes.map(({ name, logo }) => (
          <img
            key={`homepage-press-${logo}`}
            alt={`${name} logo`}
            src={data.allFile.nodes.find(file => file.name === logo).publicURL}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}

export default HomepagePress
