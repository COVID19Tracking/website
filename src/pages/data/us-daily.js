import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { FormatDate, FormatNumber } from '../../components/utils/format'
import { SyncInfobox } from '../../components/common/infobox'
import { Th, Td, Table } from '../../components/common/table'

const ContentPage = ({ data }) => (
  <Layout
    title="US Historical Data"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
  >
    <div
      className="module-content"
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />

    <SyncInfobox />

    <Table>
      <caption>US Daily Cumulative Totals - 4 pm ET</caption>
      <thead>
        <tr>
          <Th scope="col" alignLeft>
            Date
          </Th>
          <Th scope="col">States Tracked</Th>
          <Th scope="col">New Tests</Th>
          <Th scope="col">Positive</Th>
          <Th scope="col">Negative</Th>
          <Th scope="col">Pos + Neg</Th>
          <Th scope="col">Pending</Th>
          <Th scope="col">Deaths</Th>
          <Th scope="col">Total Tests</Th>
        </tr>
      </thead>
      <tbody>
        {data.allCovidUsDaily.edges.map(({ node }) => (
          <tr>
            <Td alignLeft>
              <FormatDate date={node.date} format="ccc LLL d yyyy" />
            </Td>
            <Td>{node.states}</Td>
            <Td>
              <FormatNumber number={node.totalTestResultsIncrease} />
            </Td>
            <Td>
              <FormatNumber number={node.positive} />
            </Td>
            <Td>
              <FormatNumber number={node.negative} />
            </Td>
            <Td>
              <FormatNumber number={node.positive + node.negative} />
            </Td>
            <Td>
              <FormatNumber number={node.pending} />
            </Td>
            <Td>
              <FormatNumber number={node.death} />
            </Td>
            <Td>
              <FormatNumber number={node.totalTestResults} />
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Layout>
)

export default ContentPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "us-daily" } }) {
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
    allCovidUsDaily(sort: { order: DESC, fields: date }) {
      edges {
        node {
          totalTestResults
          totalTestResultsIncrease
          states
          positive
          pending
          negative
          hospitalized
          death
          date
        }
      }
    }
    allContentfulNavigationGroup(filter: { slug: { eq: "data" } }) {
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
  }
`
