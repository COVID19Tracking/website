/*eslint-disable*/

import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '~components/layout'
import rightCaret from '~images/icons/right-caret.svg'

import BlogPostHero from '~components/pages/blog/blog-hero'
import ReportContent from '~components/pages/race/reports/report-content'
import ReportExtras from '~components/pages/race/reports/footer/report-extras'

const ReportTemplate = ({ data, path }) => {
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
    <BlogPostHero
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
      <ReportContent
        content={crdtReport.blogContent}
        vizImage={crdtReport.imageTableauViz}
      />
      <ReportExtras crdtReport={crdtReport} />
    </Layout>
  )
}

export default ReportTemplate

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
      imageTableauViz {
        id
        contentful_id
        file {
          url
        }
        title
        description
        fluid(maxWidth: 720, sizes: "4") {
          aspectRatio
          sizes
          src
          srcSet
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
      blogContent {
        raw
        references {
          ... on ContentfulContentBlockTableauChart {
            __typename
            id
            contentful_id
            name
            height
            mobileUrl
            url
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
