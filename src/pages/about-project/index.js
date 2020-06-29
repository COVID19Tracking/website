import React from 'react'
import { graphql } from 'gatsby'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import LongContent from '~components/common/long-content'
import Layout from '~components/layout'
import VolunteersList from '~components/common/volunteers-list'

export default ({ data }) => (
  <Layout
    title="About Us"
    path="/about-project"
    navigation={data.contentfulNavigationGroup.pages}
  >
    <LongContent>
      <Container centered>
        <ContentfulContent
          content={
            data.preamble.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.preamble.contentful_id}
        />
      </Container>
      <VolunteersList items={data.allCovidVolunteers.edges} />
      <Container centered>
        <ContentfulContent
          content={
            data.pastContributors.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.pastContributors.contentful_id}
        />
      </Container>
    </LongContent>
  </Layout>
)

export const query = graphql`
  query {
    preamble: contentfulSnippet(slug: { eq: "about-us-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    pastContributors: contentfulSnippet(slug: { eq: "past-contributors" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidVolunteers(sort: { fields: _sort }) {
      edges {
        node {
          name
          website
        }
      }
    }
    contentfulNavigationGroup(slug: { eq: "about-project" }) {
      pages {
        title
        link: url
      }
    }
  }
`
