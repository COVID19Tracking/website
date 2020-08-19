import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import TableOfContents from '~components/common/table-of-contents'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'

const ContentPage = ({ data, path }) => {
  const { contentfulPage } = data
  return (
    <Layout
      title={contentfulPage.title}
      path={path}
      returnLink={contentfulPage.returnLinkUrl}
      returnLinkTitle={contentfulPage.returnLinkTitle}
      socialCard={contentfulPage.socialCard}
      centered
    >
      {contentfulPage.enableToc &&
        contentfulPage.body.childMarkdownRemark.headings && (
          <TableOfContents
            headings={contentfulPage.body.childMarkdownRemark.headings}
          />
        )}
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
      enableToc
      body {
        childMarkdownRemark {
          html
          headings(depth: h2) {
            id
            value
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
`
