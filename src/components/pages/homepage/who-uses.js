import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Row, Col } from '~components/common/grid'
import whoUsesStyle from './who-uses.module.scss'

const HomepageWhoUses = () => {
  const data = useStaticQuery(graphql`
    query {
      whiteHouse: file(relativePath: { regex: "/white-house.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 400, traceSVG: { color: "#182E4E" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      covidExit: file(relativePath: { regex: "/covid-exit-strategy.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 400, traceSVG: { color: "#020202" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      jhuTracker: file(relativePath: { regex: "/jhu-tracker.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 400, traceSVG: { color: "#020202" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <>
      <h2>Who uses our data?</h2>
      <Row className={whoUsesStyle.entries}>
        <Col width={[4, 6, 4]}>
          <Img
            fluid={data.jhuTracker.childImageSharp.fluid}
            alt=""
            aria-hidden
          />
          <h3>Johns Hopkins</h3>
          <p>
            Johns Hopkins relies on our testing data for its{' '}
            <a
              href="https://coronavirus.jhu.edu/testing"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              COVID-19 Testing Insights Initiative
            </a>
            , which brings data and expert analysis together in one place.
          </p>
        </Col>
        <Col width={[4, 6, 4]}>
          <Img
            fluid={data.whiteHouse.childImageSharp.fluid}
            alt=""
            aria-hidden
          />
          <h3>The White House</h3>
          <p>
            The White House chose the COVID Tracking Project as the best source
            to cite for daily US test numbers in its{' '}
            <a href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Testing-Overview-Final.pdf">
              &ldquo;Opening Up America Again&rdquo; testing strategy
            </a>
            .
          </p>
        </Col>
        <Col width={[4, 6, 4]}>
          <Img
            fluid={data.covidExit.childImageSharp.fluid}
            alt="Screenshot of a COVID Exit Strategy chart that uses COVID Tracking Project data in its state-by-state comparison of interventions, testing, and outcomes."
          />
          <h3>COVID Exit Strategy</h3>
          <p>
            Created by a group of public health and crisis experts,{' '}
            <a href="https://covidexitstrategy.org">covidexitstrategy.org</a>{' '}
            uses our data to power a dashboard comparing each state&#8217;s
            interventions and testing levels with case counts and deaths over
            time.
          </p>
        </Col>
      </Row>
    </>
  )
}

export default HomepageWhoUses
