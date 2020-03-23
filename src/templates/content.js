import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Footer from "../components/layout/footer"

const ContentPage = ({ data }) => (
  <Layout>
    {data.markdownRemark.frontmatter && (
      <>
        <SEO title={data.markdownRemark.frontmatter.title} />
        <h1>{data.markdownRemark.frontmatter.title}</h1>
      </>
    )}
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    <Footer />
  </Layout>
)

export default ContentPage

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
