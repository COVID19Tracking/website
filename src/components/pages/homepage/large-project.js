import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/landing-page/container'
import { CtaLink } from '~components/common/landing-page/call-to-action'
import ImageCredit from '~components/common/image-credit'
import SmartQuote from '~components/common/smart-quote'
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
          <Link to="/race">
            COVID-19 <SmartQuote>isn&#8217;t</SmartQuote> affecting all
            communities equally. <SmartQuote>We&#8217;ve</SmartQuote> partnered
            with the Antiracist Research &amp; Policy Center to collect the most
            complete racial data anywhere in the COVID Racial Data Tracker.
          </Link>
        </h3>
        <p>
          <SmartQuote>We&#8217;re</SmartQuote> tracking racial and ethnic data
          from every state that reports it—and pushing those that{' '}
          <SmartQuote>don&#8217;t</SmartQuote> to start. Together with the
          Antiracist Research &amp; Policy Center,{' '}
          <SmartQuote>we&#8217;re</SmartQuote> analyzing this data to uncover
          true impact of the outbreak on vulnerable communities.
        </p>
        <CtaLink to="/race" centered>
          See the racial data tracker
        </CtaLink>
      </Container>
    </div>
  )
}
