import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import VolunteersList from '../../components/common/volunteers-list'

const VolunteersPage = ({ data }) => (
  <Layout title="Volunteers" narrow textHeavy>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <h2>Contributors</h2>
    <VolunteersList items={data.allCovidVolunteers.edges} />
  </Layout>
)

export default VolunteersPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "volunteer-preamble" } }) {
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
    allCovidVolunteers {
      edges {
        node {
          name
          website
        }
      }
    }
  }
`
