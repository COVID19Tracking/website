import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

const ContentPage = ({ data, path }) => {
  const { contentfulPage } = data
  return (
    <Layout
      title={contentfulPage.title}
      navigation={
        contentfulPage.navigationGroup
          ? contentfulPage.navigationGroup.pages
          : false
      }
      path={path}
      returnLink={contentfulPage.returnLinkUrl}
      returnLinkTitle={contentfulPage.returnLinkTitle}
      socialCard={contentfulPage.socialCard}
      narrow
      textHeavy
    >
      <ContentfulContent
        id={contentfulPage.contentful_id}
        content={contentfulPage.body.childMarkdownRemark.html}
      />
    </Layout>
  )
}

export default ContentPage

export const query = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
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
`
