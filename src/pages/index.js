import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link, graphql } from 'gatsby'
import SkipNavigation from '../components/utils/skip-navigation'
import Header from '../components/layout/header'
import Container from '../components/common/container'
import SEO from '../components/utils/seo'
import Footer from '../components/layout/footer'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/common/press-list'
import BlogList from '../components/pages/blog/blog-list'
import Visualizations from '../components/pages/homepage/visualizations'
import ListArrow from '../components/common/list-arrow'
import homepageStyles from './index.module.scss'

export default ({ data }) => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>
    <div className={`press-logos layout-region ${homepageStyles.pressLogos}`}>
      <Container>
        <h2 className="hed-landscape">Our data has been cited by</h2>
        <PressLogos onlyFeatured />
      </Container>
    </div>
    <main id="main" className={homepageStyles.main}>
      <Visualizations />
      <Container>
        <div className="layout-region layout--content-and-rail">
          <div className="layout--content-primary">
            <div
              className={`module-content ${homepageStyles.content}`}
              dangerouslySetInnerHTML={{
                __html:
                  data.allContentfulSnippet.edges[0].node
                    .childContentfulSnippetContentTextNode.childMarkdownRemark
                    .html,
              }}
            />
            <ListArrow
              items={[
                <p>
                  <Link to="/data">
                    Check your state&apos;s testing data report card
                  </Link>{' '}
                  to see the quality of the data they are providing.
                </p>,
                <p>
                  Want to get involved?{' '}
                  <Link to="/help">Help us get better data</Link>.
                </p>,
              ]}
            />
          </div>
          <div className="layout--content-secondary">
            <div className="module">
              <h2 className="hed-secondary">Blog</h2>
              <BlogList items={data.allContentfulBlogPost.edges} />
            </div>
            <div className="module">
              <h2 className="hed-secondary">In the Press</h2>

              <PressList items={data.allCovidPress.edges} />

              <Link
                to="/about-project/in-the-press"
                className={homepageStyles.pressListMore}
              >
                More news
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
    <Footer />
  </>
)

export const query = graphql`
  query {
    allCovidPress(
      filter: {
        addToCovidTrackingProjectWebsite: { eq: true }
        title: { ne: "null" }
      }
      sort: { fields: publishDate, order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          title
          url
          publication
          publishDate(formatString: "MMMM D, YYYY")
        }
      }
    }
    allContentfulSnippet(filter: { slug: { eq: "homepage-main" } }) {
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

    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          title
          slug
          author {
            name
          }
          publishDate(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`
