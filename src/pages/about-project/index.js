import React from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import VolunteersList from '~components/common/volunteers-list'

export default ({ data }) => (
  <Layout
    title="About us"
    path="/about-project"
    narrow
    textHeavy
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.preamble.edges[0].node.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html,
      }}
    />
    <VolunteersList items={data.allCovidVolunteers.edges} />
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.pastContributors.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
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
