import React from 'react'
import { graphql, Link } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import { FieldName } from '~components/utils/field-name'
import TableResponsive from '~components/common/table-responsive'
import Layout from '~components/layout'

const DataStateTotalTestsPage = ({ data }) => {
  const states = []
  data.allCovidStateInfo.nodes.forEach(state => {
    const column =
      state.totalTestResultsColumns === 'posNeg'
        ? 'totalTestResults'
        : state.totalTestResultsColumns
    states.push({
      state: <Link to={`/${state.childSlug.slug}`}>{state.name}</Link>,
      field: (
        <Link to={`/about-data/data-definitions#definition-${column}`}>
          <FieldName field={column} />
        </Link>
      ),
      units: state.totalTestResultsUnits,
    })
  })

  return (
    <Layout
      title="How We Report Total Tests"
      path="/data/total-tests"
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
    contentfulSnippet(slug: { eq: "total-tests" }) {
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
