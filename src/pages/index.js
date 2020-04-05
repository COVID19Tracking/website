import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { Link, graphql } from 'gatsby'
import { Flex, Box } from '../components/common/flexbox'
import SkipNavigation from '../components/common/skip-navigation'
import Header from '../components/layout/header'
import Container from '../components/common/container'
import SEO from '../components/layout/seo'
import Footer from '../components/layout/footer'
import PressLogos from '../components/pages/homepage/press-logos'
import PressList from '../components/common/press-list'
import Visualizations from '../components/pages/homepage/visualizations'
import '../scss/pages/homepage.scss'

export default ({ data }) => (
  <>
    <SEO title="The COVID Tracking Project" />
    <SkipNavigation />
    <Header siteTitle="The COVID Tracking Project" noMargin hasHero />
    <SkipNavContent />
    <h1 className="a11y-only">The COVID Tracking Project</h1>
    <div className="homepage-press-logos-wrapper">
      <Container>
        <h2>Our data has been cited by</h2>
        <PressLogos onlyFeatured />
      </Container>
    </div>
    <main id="main" className="homepage">
      <Visualizations />
      <Container>
        <Flex flexWrap="wrap" mt={['1rem', '2rem']}>
          <Box width={[1, 1, 2 / 3]} pr={[0, '1rem', '5rem']}>
            <div
              className="homepage-content"
              dangerouslySetInnerHTML={{
                __html:
                  data.allContentfulSnippet.edges[0].node
                    .childContentfulSnippetContentTextNode.childMarkdownRemark
                    .html,
              }}
            />
            <div className="homepage-get-involved">
              <div className="homepage-get-involved-icon">→</div>
              <p>
                <Link to="/data">
                  Check your state&apos;s testing data report card
                </Link>{' '}
                to see the quality of the data they are providing.
              </p>
            </div>
            <div className="homepage-get-involved">
              <div className="homepage-get-involved-icon">→</div>
              <p>
                Want to get involved?{' '}
                <Link to="/help">Help us get better data</Link>.
              </p>
            </div>
          </Box>
          <Box width={[1, 1, 1 / 3]}>
            <Link to="/about/in-the-press" className="homepage-press-list-more">
              More news
            </Link>
            <h2>In the Press</h2>

            <PressList items={data.allCovidPress.edges} />
          </Box>
        </Flex>
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
  }
`
