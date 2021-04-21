import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import { BlogItem } from '~components/pages/homepage/blog-list'
import ImageBlock from '~components/pages/blog/content-blocks/image-content-block'
import Layout from '~components/layout'
import Paragraph from '~components/common/landing-page/paragraph'
import HeroText from '~components/common/landing-page/hero-text'
import { CtaLink } from '~components/common/call-to-action'

const LongTermCarePage = ({ data }) => (
  <Layout
    title="Long-Term-Care COVID Tracker"
    path="/nursing-homes-long-term-care-facilities"
    description="To date, the Long-Term-Care COVID Tracker is the most comprehensive dataset about COVID-19 in US long-term care facilities."
  >
    <HeroText>
      Using state and federal data, we can estimate that as of March 2021:
    </HeroText>
    <Paragraph>
      <span
        dangerouslySetInnerHTML={{
          __html: marked.inlineLexer(data.lede.content.content, []),
        }}
      />
    </Paragraph>
    <ContentfulContent
      id={data.notes.contentful_id}
      content={
        data.notes.childContentfulSnippetContentTextNode.childMarkdownRemark
          .html
      }
    />
    <Container centered>
      <ImageBlock
        keepSize
        imageUrl="/images/cms-ctp.png"
        image={{
          description:
            'Chart comparing Covid Tracking Project data to federal CMS data.',
        }}
      />
    </Container>

    <Container centered>
      <h2>Our Analysis &amp; Updates</h2>
      {data.allContentfulBlogPost.nodes.map(post => (
        <BlogItem post={post} extraMargin hideReadLink />
      ))}
      <CtaLink bold to="/analysis-updates/category/long-term-care">
        See all our analysis of long-term care data
      </CtaLink>
    </Container>
  </Layout>
)

export default LongTermCarePage

export const query = graphql`
  query {
    covidLtcWebsite {
      casesCumulative
      deathsCumulative
      facilitiesCumulative
    }
    allContentfulBlogPost(
      limit: 4
      sort: { fields: publishDate, order: DESC }
      filter: { categories: { elemMatch: { slug: { eq: "long-term-care" } } } }
    ) {
      nodes {
        title
        publishDate(formatString: "MMMM D, YYYY")
        slug
        lede {
          lede
        }
      }
    }
    notes: contentfulSnippet(slug: { eq: "ltc-top-notes" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    lede: contentfulSnippet(slug: { eq: "ltc-lede" }) {
      content {
        content
      }
    }
  }
`
