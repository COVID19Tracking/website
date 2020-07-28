import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'

const ContentPage = ({ data, path }) => {
  const { contentfulPage } = data
  return (
    <Layout
      title={contentfulPage.title}
      path={path}
      returnLinks={[
        {
          link: contentfulPage.returnLinkUrl,
          title: contentfulPage.returnLinkTitle,
        },
      ]}
      socialCard={contentfulPage.socialCard}
      centered
    >
      <LongContent>
        <ContentfulContent
          id={contentfulPage.contentful_id}
          content={contentfulPage.body.childMarkdownRemark.html}
        />
      </LongContent>
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
    }
  }
`
