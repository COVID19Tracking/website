import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import VolunteersList from '~components/common/volunteers-list'

export default ({ data }) => (
  <Layout
    title="About Us"
    path="/about-project"
    narrow
    textHeavy
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <ContentfulContent
      content={
        data.preamble.edges[0].node.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.preamble.edges[0].node.contentful_id}
    />
    <VolunteersList items={data.allCovidVolunteers.edges} />
    <ContentfulContent
      content={
        data.pastContributors.edges[0].node
          .childContentfulSnippetContentTextNode.childMarkdownRemark.html
      }
      id={data.pastContributors.edges[0].node.contentful_id}
    />
  </Layout>
)

export const query = graphql`
  query {
    preamble: allContentfulSnippet(
      filter: { slug: { eq: "about-us-preamble" } }
    ) {
      edges {
        node {
          contentful_id
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    pastContributors: allContentfulSnippet(
      filter: { slug: { eq: "past-contributors" } }
    ) {
      edges {
        node {
          contentful_id
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
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
    allContentfulNavigationGroup(filter: { slug: { eq: "about-project" } }) {
      edges {
        node {
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
`
