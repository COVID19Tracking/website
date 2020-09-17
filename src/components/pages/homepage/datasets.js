import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Feature from '~components/common/landing-page/feature'

const HomepageDatasets = () => {
  const data = useStaticQuery(graphql`
    query {
      whiteHouse: file(relativePath: { regex: "/white-house.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#182E4E" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      covidExit: file(relativePath: { regex: "/covid-exit-strategy.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#020202" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      jhuTracker: file(relativePath: { regex: "/jhu-tracker.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#020202" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
  return (
    <div>
      <Feature
        title="Johns Hopkins"
        element={
          <Img
            fluid={data.jhuTracker.childImageSharp.fluid}
            alt="Screenshot of a COVID Exit Strategy chart that uses COVID Tracking Project data in its state-by-state comparison of interventions, testing, and outcomes."
          />
        }
        flip
      >
        Johns Hopkins relies on our testing data for its{' '}
        <a
          href="https://coronavirus.jhu.edu/testing"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          COVID-19 Testing Insights Initiative
        </a>
        , which brings data and expert analysis together in one place. The
        initiative is designed to help policymakers and the public understand
        the trajectory of the pandemic, and make decisions about the path
        forward.
      </Feature>
      <Feature
        title="The White House"
        element={
          <Img
            fluid={data.whiteHouse.childImageSharp.fluid}
            alt="Image composite showing COVID Tracking Project data in use on a slide from the White House’s 'Opening Up America Again' testing strategy presentation deck."
          />
        }
      >
        The White House chose the COVID Tracking Project as the best source to
        cite for daily US test numbers in its{' '}
        <a href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Testing-Overview-Final.pdf">
          &ldquo;Opening Up America Again&rdquo; testing strategy
        </a>
        .
      </Feature>
      <Feature
        title="COVID Exit Strategy"
        element={
          <Img
            fluid={data.covidExit.childImageSharp.fluid}
            alt="Screenshot of a COVID Exit Strategy chart that uses COVID Tracking Project data in its state-by-state comparison of interventions, testing, and outcomes."
          />
        }
        flip
      >
        Created by a group of public health and crisis experts,{' '}
        <a href="https://covidexitstrategy.org">covidexitstrategy.org</a>{' '}
        identifies critical interventions needed to stop the spread of COVID-19,
        and urges government decision-makers to apply them. They use our data to
        power a dashboard comparing each state&#8217;s interventions and testing
        levels with case counts and deaths over time.
      </Feature>
    </div>
  )
}

export default HomepageDatasets
