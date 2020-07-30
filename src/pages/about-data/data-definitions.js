import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'

export default ({ data }) => (
  <Layout title="Data Definitions" centered>
    <LongContent>
      <ContentfulContent
        content={
          data.preamble.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.preamble.contentful_id}
      />
      {data.allContentfulDataDefinition.nodes.map(definition => (
        <Fragment key={definition.contentful_id}>
          <h3 id={`definition-${definition.fieldName}`}>{definition.name}</h3>
          <p>
            API field name: <em>{definition.fieldName}</em>
          </p>
          <ContentfulContent
            content={
              definition.childContentfulDataDefinitionDefinitionTextNode
                .childMarkdownRemark.html
            }
            id={definition.contentful_id}
          />
        </Fragment>
      ))}
    </LongContent>
  </Layout>
)

export const query = graphql`
  query {
    preamble: contentfulSnippet(slug: { eq: "data-definitions-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulDataDefinition(sort: { fields: name }) {
      nodes {
        name
        fieldName
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
        contentful_id
      }
    }
  }
`
