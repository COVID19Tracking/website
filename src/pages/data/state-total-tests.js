import React from 'react'
import { graphql, Link } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import { FieldName } from '~components/utils/field-name'
import TableResponsive from '~components/common/table-responsive'
import Layout from '~components/layout'

const DataStateTotalTestsPage = ({ data }) => {
  const states = []
  data.allCovidStateInfo.nodes.forEach(state => {
    states.push({
      state: <Link to={`/${state.childSlug.slug}`}>{state.name}</Link>,
      field: (
        <Link
          to={`/about-data/data-definitions#definition-${state.totalTestResultsColumns}`}
        >
          <FieldName
            field={
              state.totalTestResultsColumns === 'posNeg'
                ? 'totalTestResults'
                : state.totalTestResultsColumns
            }
          />
        </Link>
      ),
      units: state.totalTestResultsUnits,
    })
  })

  return (
    <Layout
      title="Data Download"
      path="/data/download"
      returnLinks={[{ link: '/data' }]}
    >
      <ContentfulContent
        content={
          data.contentfulSnippet.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
        id={data.contentfulSnippet.contentful_id}
      />
      <h2>All states</h2>
      <TableResponsive
        labels={[
          {
            field: 'state',
            label: 'State',
          },
          {
            field: 'field',
            label: 'Total tests field',
          },
          {
            field: 'units',
            label: 'Units',
          },
        ]}
        data={states}
      />
    </Layout>
  )
}

export default DataStateTotalTestsPage

export const query = graphql`
  query {
    contentfulSnippet(slug: { eq: "total-test-results-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidStateInfo(sort: { fields: name }) {
      nodes {
        childSlug {
          slug
        }
        state
        name
        totalTestResultsColumns
        totalTestResultsUnits
      }
    }
  }
`
