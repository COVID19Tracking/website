import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Paragraph from './paragraph'
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
          <Img fluid={data.file.childImageSharp.fluid} alt="" />
        )}
        <h3>Johns Hopkins</h3>
        <p>
          Johns Hopkins relies on our testing data for its COVID-19 Testing
          Insights Initiative, which brings data and expert analysis together in
          one place. The initiative is designed to help policymakers and the
          public understand the trajectory of the pandemic, and make decisions
          about the path forward.
        </p>
      </div>
    </div>
  )
}
