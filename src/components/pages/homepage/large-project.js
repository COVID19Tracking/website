import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/container'
import CtaLink from './cta-link'
import largeProjectStyles from './large-project.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/project-large.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#A7DEF6" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <div className={largeProjectStyles.wrapper}>
      <Container>
        {data.file.childImageSharp && (
          <Img fluid={data.file.childImageSharp.fluid} alt="" />
        )}
        <h3>
          COVID-19 isn&apos;t affecting all communities equally. We&apos;ve
          partnered with Anti-Racism Policy Center to collect the most complete
          racial data anywhere in the COVID Racial Data Tracker.{' '}
        </h3>
        <p>
          We’ve partnered with the Antiracist Research &amp; Policy Center to
          add racial data to our reporting where it exists, and to push states
          to provide it where it doesn&apos;t. Together, we&apos;re analyzing
          this data to uncover the true impact of the outbreak on vulnerable
          communities.
        </p>
        <CtaLink to="/race" centered>
          See all our data
        </CtaLink>
      </Container>
    </div>
  )
}
