import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Container from '~components/common/container'

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
    <Container>
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
    </Container>
  )
}
