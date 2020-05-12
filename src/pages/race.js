import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import pressListStyle from '../components/common/press-list.module.scss'
import {
  PublicationTitle,
  PublicationSource,
} from '../components/common/publication'
import DetailText from '../components/common/detail-text'
import margueriteCaseyLogo from '../images/race-project/marguerite-casey-foundation.png'
import raceProjectStyle from './race.module.scss'

const NotFoundPage = ({ data }) => (
  <Layout
    title="The COVID Racial Data Tracker"
    path="/race"
    navigation={data.allContentfulNavigationGroup.edges[0].node.pages}
    textHeavy
    narrow
  >
    <div
      className="module-content"
      dangerouslySetInnerHTML={{
        __html:
          data.allContentfulSnippet.edges[0].node
            .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
      }}
    />
    <h2>Related articles</h2>
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
    <div className={raceProjectStyle.supporters}>
      <h3>Our tracker is supported by</h3>
      <a href="https://caseygrants.org/">
        <img src={margueriteCaseyLogo} alt="The Marguerite Casey Foundation" />
      </a>
    </div>
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
    allContentfulNavigationGroup(filter: { slug: { eq: "why-it-matters" } }) {
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
