import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const ContentPage = ({ data, path }) => {
  const page = data.allContentfulPage.edges[0].node
  return (
    <Layout
      title={page.title}
      navigation={page.navigationGroup ? page.navigationGroup.pages : false}
      path={path}
      narrow
      textHeavy
    >
      <div
        className="module-content"
        dangerouslySetInnerHTML={{ __html: page.body.childMarkdownRemark.html }}
      />
    </Layout>
  )
}

export default ContentPage

export const query = graphql`
  query($id: String!) {
    allContentfulPage(filter: { id: { eq: $id } }) {
      edges {
        node {
          title
          slug
          body {
            childMarkdownRemark {
              html
            }
          }
          navigationGroup {
            pages {
              ... on ContentfulPage {
                title
                link: slug
              }
              ... on ContentfulNavigationLink {
                title
                link: url
              }
            }
          }
        }
      }
    }
  }
`
