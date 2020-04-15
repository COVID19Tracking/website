import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import pressListStyle from '../components/common/press-list.module.scss'
import {
  PublicationTitle,
  PublicationSource,
} from '../components/common/publication'
import DetailText from '../components/common/detail-text'

const NotFoundPage = ({ data }) => (
  <Layout title="Racial Data Tracker" textHeavy narrow>
    <div
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <h2>News</h2>
    <ul className={`press-list ${pressListStyle.pressList}`}>
      {data.allContentfulRaceProjectNewsArticle.edges.map(({ node }) => (
        <li key={`race-project-press-${node.id}`}>
          <PublicationTitle>
            <a href={node.link}>{node.title}</a>
          </PublicationTitle>
          <DetailText>
            <PublicationSource>{node.publicationName}</PublicationSource>
            <span className={pressListStyle.dotSeparator}>•</span>
            {node.date}
          </DetailText>
        </li>
      ))}
    </ul>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query {
    allContentfulSnippet(filter: { slug: { eq: "race-preamble" } }) {
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

    allContentfulRaceProjectNewsArticle(sort: { fields: date, order: DESC }) {
      edges {
        node {
          publicationName
          title
          date(formatString: "MMMM D, YYYY")
          link
        }
      }
    }
  }
`
