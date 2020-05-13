/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { Form, FormGroup, FormLabel } from '~components/common/form'
import DetailText from '~components/common/detail-text'

export default ({ data }) => (
  <Layout
    title="How you can help"
    narrow
    textHeavy
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.helpPreamble.edges[0].node.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html,
      }}
    />
    <Form>
      <form
        action="https://covidtracking.us4.list-manage.com/subscribe/post?u=0921fdd380ed1e2245d87c3b6&amp;id=14a2b6d1bd"
        method="post"
        target="_blank"
        noValidate
      >
        <FormGroup>
          <FormLabel htmlFor="action-form-first-name">First name</FormLabel>
          <input
            type="text"
            name="FNAME"
            id="action-form-first-name"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="action-form-last-name">Last name</FormLabel>
          <input
            type="text"
            name="LNAME"
            id="action-form-last-name"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="action-form-email">Email address</FormLabel>
          <input
            type="email"
            name="EMAIL"
            id="action-form-email"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="action-form-zip">Zip code</FormLabel>
          <DetailText>
            To receive updates specific to your location, please enter a zip
            code.
          </DetailText>
          <input
            type="text"
            name="MMERGE3"
            id="action-form-zip"
            aria-required
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            name="b_0921fdd380ed1e2245d87c3b6_14a2b6d1bd"
            tabIndex="-1"
            value=""
            style={{ display: 'none' }}
            aria-hidden
          />
          <button type="submit">Subscribe</button>
        </FormGroup>
      </form>
    </Form>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.helpClosure.edges[0].node.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html,
      }}
    />
  </Layout>
)

export const query = graphql`
  query {
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
    helpPreamble: allContentfulSnippet(
      filter: { slug: { eq: "help-preamble" } }
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
    helpClosure: allContentfulSnippet(filter: { slug: { eq: "help-close" } }) {
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
