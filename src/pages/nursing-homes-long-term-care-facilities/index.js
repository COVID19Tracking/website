import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import ContentfulContent from '~components/common/contentful-content'
import { BlogItem } from '~components/pages/homepage/blog-list'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import Layout from '~components/layout'
import Paragraph from '~components/common/landing-page/paragraph'

const LongTermCarePage = ({ data }) => {
  const Snippet = ({ slug }) => {
    const item = data.contentfulSnippetCollection.snippets.find(
      snippet => snippet.slug === slug,
    )
    return (
      <ContentfulContent
        id={item.contentful_id}
        content={
          item.childContentfulSnippetContentTextNode.childMarkdownRemark.html
        }
      />
    )
  }

  return (
    <Layout
      title="The Long-Term Care COVID Tracker"
      path="/nursing-homes-long-term-care-facilities"
      description="To date, the Long-Term Care COVID Tracker is the most comprehensive dataset about COVID-19 in US long-term care facilities."
    >
      <Paragraph>
        <span
          dangerouslySetInnerHTML={{
            __html: marked.inlineLexer(data.lede.content.content, []),
          }}
        />
      </Paragraph>

      <Snippet slug="ltc-top-notes" />
      <h3 className="no-margin-bottom">Cumulative</h3>
      <Row>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total cases"
            number={
              <FormatNumber number={data.covidLtcWebsite.casesCumulative} />
            }
          />
        </Col>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total deaths"
            number={
              <FormatNumber number={data.covidLtcWebsite.deathsCumulative} />
            }
          />
        </Col>
        <Col width={[4, 6, 4]}>
          <Total
            label="Total number of facilities affected"
            number={
              <FormatNumber
                number={data.covidLtcWebsite.facilitiesCumulative}
              />
            }
          />
        </Col>
      </Row>
      <Container centered>
        <h2>Our Analysis &amp; Updates</h2>
        {data.allContentfulBlogPost.nodes.map(post => (
          <BlogItem post={post} extraMargin hideReadLink />
        ))}
      </Container>
    </Layout>
  )
}

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
    contentfulSnippetCollection(slug: { eq: "long-term-care-landing-page" }) {
      snippets {
        contentful_id
        slug
        childContentfulSnippetContentTextNode {
          childMarkdownRemark {
            html
          }
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
