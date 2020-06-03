import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

const ContentPage = ({ data, path }) => {
  const page = data.allContentfulPage.edges[0].node
  return (
    <Layout
      title={page.title}
      navigation={page.navigationGroup ? page.navigationGroup.pages : false}
      path={path}
      returnLink={page.returnLinkUrl}
      returnLinkTitle={page.returnLinkTitle}
      socialCard={page.socialCard}
      narrow
      textHeavy
    >
      <ContentfulContent
        className="module-content"
        id={page.contentful_id}
        content={page.body.childMarkdownRemark.html}
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
          contentful_id
          returnLinkTitle
          returnLinkUrl
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
          socialCard {
            description {
              description
            }
            image {
              resize(width: 1200) {
                src
              }
            }
          }
        }
      }
    }
  }
`
