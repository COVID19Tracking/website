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
      <h2 className={pressStyles.header}>Who’s using the data</h2>
      <div className={pressStyles.logos}>
        {data.allHomepagePressYaml.nodes.map(({ name, logo }) => (
          <img
            key={`homepage-press-${logo}`}
            alt={`${name} logo`}
            src={data.allFile.nodes.find(file => file.name === logo).publicURL}
          />
        ))}
      </div>
    </section>
  )
}

export default HomepagePress
