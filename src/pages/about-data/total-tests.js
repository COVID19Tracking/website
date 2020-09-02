import React from 'react'
import { graphql, Link } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import { FieldName } from '~components/utils/field-name'
import TableResponsive from '~components/common/table-responsive'
import Container from '~components/common/container'
import Layout from '~components/layout'

const DataStateTotalTestsPage = ({ data }) => {
  const states = []
  data.allCovidStateInfo.nodes.forEach(state => {
    const column =
      state.covidTrackingProjectPreferredTotalTestField === 'posNeg'
        ? 'totalTestResults'
        : state.covidTrackingProjectPreferredTotalTestField
    states.push({
      state: (
        <Link to={`/data/state/${state.childSlug.slug}`}>{state.name}</Link>
      ),
      field: (
        <Link to={`/about-data/data-definitions#definition-${column}`}>
          <FieldName field={column} />
        </Link>
      ),
      units: state.covidTrackingProjectPreferredTotalTestUnits,
    })
  })

  return (
    <Layout
      title="How We Report Total Tests"
      path="/about-data/total-tests"
      returnLinks={[{ link: '/about-data' }]}
    >
      <Container centered>
        <ContentfulContent
          content={
            data.contentOpening.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentOpening.contentful_id}
        />
      </Container>
      <TableResponsive
        labels={[
          {
            field: 'state',
            label: 'State',
            alignLeft: true,
          },
          {
            field: 'field',
            label: 'Total tests field',
            alignLeft: true,
          },
          {
            field: 'units',
            label: 'Units',
            alignLeft: true,
          },
        ]}
        data={states}
      />
      <Container centered>
        <ContentfulContent
          content={
            data.contentClosure.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
          id={data.contentClosure.contentful_id}
        />
      </Container>
    </Layout>
  )
}

export default DataStateTotalTestsPage

export const query = graphql`
  query {
    contentOpening: contentfulSnippet(slug: { eq: "total-tests" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    contentClosure: contentfulSnippet(slug: { eq: "total-tests-closure" }) {
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
        covidTrackingProjectPreferredTotalTestField
        covidTrackingProjectPreferredTotalTestUnits
      }
    }
  }
`
