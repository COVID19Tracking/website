import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'

export default ({ data }) => (
  <Layout title="Data definition" path="about-data/data-definitions" narrow>
    {data.allContentfulDataDefinition.nodes.map(definition => (
      <>
        <h2 id={definition.slug}>{definition.name}</h2>
        <ContentfulContent
          id={definition.contentful_id}
          content={
            definition.childContentfulDataDefinitionDefinitionTextNode
              .childMarkdownRemark.html
          }
        />
      </>
    ))}
  </Layout>
)

export const query = graphql`
  query {
    allContentfulDataDefinition {
      nodes {
        apiFieldName
        cdcDefinition
        contentful_id
        csteDefinition
        name
        slug
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
