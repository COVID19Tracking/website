/*eslint-disable*/

import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'
import rightCaret from '~images/icons/right-caret.svg'
import Hero from '~components/pages/blog/blog-hero'

const CrdtReportTemplate = ({ data, path }) => {
  const crdtReport = data.contentfulCrdtArticle
  const socialCard = crdtReport.socialCard || {
    description: crdtReport.lede.lede,
  }

  const returnLinksContent = (
    <>
      <Link to="/race">Racial Data Tracker</Link>
      <img src={rightCaret} alt="" height="12px" />
      <Link to="/race/reports">Our Reports</Link>
    </>
  )

  const hero = (
    <Hero
      headline={crdtReport.title}
      authors={crdtReport.authors}
      published={crdtReport.publishDate}
      id={crdtReport.contentful_id}
      returnLinksContent={returnLinksContent}
    />
  )

  return (
    <Layout
      title={crdtReport.title}
      socialCard={socialCard}
      path={path}
      hero={hero}
      centerTitle
    >
      <p>Hello world lalala</p>
    </Layout>
  )
}

export default CrdtReportTemplate

export const query = graphql`
  query($id: String!) {
    contentfulCrdtArticle(id: { eq: $id }) {
      contentful_id
      title
      authors {
        name
        twitterLink
        twitterHandle
        link
        childContentfulAuthorBiographyTextNode {
          childMarkdownRemark {
            html
          }
        }
        headshot {
          file {
            fileName
          }
          resize(width: 200) {
            width
            height
            src
          }
        }
      }
      socialCard {
        description {
          description
        }
        image {
          resize(width: 1200) {
            src
          }
        }
      }
      slug
      lede {
        lede
      }
      publishDate(formatString: "MMMM D, YYYY")
    }
  }
`
