import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '../components/layout'

export default ({ data }) => (
  <Layout title={data.contentfulDataDefinition.name} narrow>
    <ContentfulContent
      id={data.contentfulDataDefinition.contentful_id}
      content={
        data.contentfulDataDefinition
          .childContentfulDataDefinitionDefinitionTextNode.childMarkdownRemark
          .html
      }
    />
  </Layout>
)

export const query = graphql`
  query($id: String!) {
    contentfulDataDefinition(id: { eq: $id }) {
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
`
