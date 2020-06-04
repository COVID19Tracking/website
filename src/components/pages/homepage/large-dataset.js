import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Paragraph from '~components/common/landing-page/paragraph'
import largeDatasetStyles from './large-dataset.module.scss'

export default () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/john-hopkins-chart.png/" }) {
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
    <div className={largeDatasetStyles.largeDataset}>
      <Paragraph additionalClass={largeDatasetStyles.homepageParagraph}>
        Our data powers crucial reporting and research. Here are just a few of
        the organizations that rely on our dataset.
      </Paragraph>
      <div>
        {data.file.childImageSharp && (
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="Chart from the Johns Hopkins COVID-19 Testing Insights Initiative depicting daily total tests and daily positive tests using COVID Tracking Project data."
          />
        )}
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
          , which brings data and expert analysis together in one place. The
          initiative is designed to help policymakers and the public understand
          the trajectory of the pandemic, and make decisions about the path
          forward. (Please note this visualization is not a dynamic
          representation of case data, and will not update automatically.)
        </p>
      </div>
    </div>
  )
}
