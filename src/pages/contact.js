import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import GetInvolved from '../components/common/get-involved'

const ContactPage = ({ data }) => (
  <Layout title="Contact us">
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <GetInvolved
      items={[
        <p>
          <Link to="/data">Volunteer on the project.</Link>
        </p>,
        <p>
          <Link to="/data">
            Interview someone on the project for a news story.
          </Link>
        </p>,
        <p>
          <Link to="/contact/accessibility">
            Report a problem with accessibility on the website.
          </Link>
        </p>,
        <p>
          <Link to="/data">Something else.</Link>
        </p>,
      ]}
    />
  </Layout>
)

export default ContactPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "contact-page" } }) {
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
  }
`
