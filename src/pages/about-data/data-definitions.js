import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import slugify from 'slugify'
import Layout from '~components/layout'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import { TableOfContentsWrapper } from '~components/common/table-of-contents'

const DataDefintionsPage = ({ data }) => {
  const categories = [
    'Cases',
    'PCR tests',
    'Antibody tests',
    'Antigen tests',
    'Hospitalization',
    'Outcomes',
    'State metadata',
  ]
  const { nodes } = data.allContentfulDataDefinition
  return (
    <Layout title="Data Definitions" centered>
      <LongContent>
        <ContentfulContent
          content={
            data.preamble.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.preamble.contentful_id}
        />
        <TableOfContentsWrapper>
          <h2>Data categories</h2>
          <ul>
            {categories.map(category => (
              <li>
                <a href={`#${slugify(category, { lower: true })}`}>
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </TableOfContentsWrapper>
        {categories.map(category => (
          <>
            <h2 id={slugify(category, { lower: true })}>{category}</h2>
            {nodes
              .filter(
                node => node.category.toLowerCase() === category.toLowerCase(),
              )
              .map(definition => (
                <Fragment key={definition.contentful_id}>
                  <h3 id={`definition-${definition.fieldName}`}>
                    {definition.name}
                  </h3>
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
          </>
        ))}
      </LongContent>
    </Layout>
  )
}

export default DataDefintionsPage

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
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: { apiOnly: { ne: true } }
    ) {
      nodes {
        name
        fieldName
        category
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
