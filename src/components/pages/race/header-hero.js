import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/container'
import HeroHeader from '~components/common/landing-page/hero/header'
import HeroText from '~components/common/landing-page/hero/text'
import headerHeroStyle from './header-hero.module.scss'
import ImageCredit from '~components/common/image-credit'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/crdt-landing-header.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#8b8dc7" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <div className={headerHeroStyle.hero}>
      <Container>
        <div className={headerHeroStyle.contentWrapper}>
          <div className={headerHeroStyle.content}>
            <HeroHeader>
              COVID-19 is affecting people of color the most. We’re tracking the
              data in real time.
            </HeroHeader>
            <HeroText>
              The COVID Racial Data Tracker is a collaboration between the COVID
              Tracking Project and the Antiracist Research &amp; Policy Center.
              Together, we&apos;re gathering the most complete race and
              ethnicity data on COVID-19 in the United States.
            </HeroText>
          </div>
          <div className={headerHeroStyle.image}>
            <Img fluid={data.file.childImageSharp.fluid} alt="" aria-hidden />
            <ImageCredit white>
              Júlia Ledur / COVID Tracking Project
            </ImageCredit>
          </div>
        </div>
      </Container>
    </div>
  )
}
