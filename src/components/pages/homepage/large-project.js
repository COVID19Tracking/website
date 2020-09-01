import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import ImageCredit from '~components/common/image-credit'
import largeProjectStyles from './large-project.module.scss'

const HomepageLargeProject = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/project-large.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#E2D2CE" }) {
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
          <>
            <Link to="/race">
              <Img
                fluid={data.file.childImageSharp.fluid}
                alt="Illustration of a face split into strips of different colored skintones on a light purple background."
              />
            </Link>
            <ImageCredit>Mohini Dutta / COVID Tracking Project</ImageCredit>
          </>
        )}
        <h3>
          COVID-19 isn&apos;t affecting all communities equally. We&apos;ve
          partnered with the Boston University Center for Antiracist Research to
          collect the most complete racial data anywhere in the{' '}
          <Link to="/race">COVID Racial Data Tracker.</Link>
        </h3>
        <p>
          We&#8217;re tracking racial and ethnic data from every state that
          reports it—and pushing those that don&#8217;t to start. Together with
          the BU Center for Antiracist Research, we&#8217;re analyzing this data
          to uncover the true impact of the outbreak on vulnerable communities.
        </p>
        <CtaLink to="/race" centered>
          See the racial data tracker
        </CtaLink>
      </Container>
    </div>
  )
}

export default HomepageLargeProject
