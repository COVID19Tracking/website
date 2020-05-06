import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Dataset from './dataset'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      whiteHouse: file(relativePath: { regex: "/white-house.png/" }) {
        relativePath
        childImageSharp {
          fluid(maxWidth: 1200, traceSVG: { color: "#A7DEF6" }) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      covidExit: file(relativePath: { regex: "/covid-exit-strategy.png/" }) {
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
    <div>
      <Dataset
        title="The White House"
        image={data.whiteHouse.childImageSharp.fluid}
        imageAlt="Image composite showing COVID Tracking Project data in use on a slide from the White House’s 'Opening Up America Again' testing strategy presentation deck."
      >
        The White House chose the COVID Tracking Project as the best source to
        cite for daily US test numbers in its{' '}
        <a href="https://www.whitehouse.gov/wp-content/uploads/2020/04/Testing-Overview-Final.pdf">
          &ldquo;Opening Up America Again&rdquo; testing strategy
        </a>
        .
      </Dataset>
      <Dataset
        title="COVID Exit Strategy"
        image={data.covidExit.childImageSharp.fluid}
        imageAlt="Screenshot of a COVID Exit Strategy chart that uses COVID Tracking Project data in its state-by-state comparison of interventions, testing, and outcomes."
        flip
      >
        Created by a group of public health and crisis experts,{' '}
        <a href="https://covidexitstrategy.org">covidexitstrategy.org</a>{' '}
        identifies critical interventions needed to stop the spread of COVID-19,
        and urges government decision-makers to apply them. They use our data to
        power a dashboard comparing each state&apos;s interventions and testing
        levels with case counts and deaths over time.
      </Dataset>
    </div>
  )
}
