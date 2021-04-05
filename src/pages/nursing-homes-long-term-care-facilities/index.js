import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import { BlogItem } from '~components/pages/homepage/blog-list'
import TableauChart from '~components/charts/tableau'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import DetailText from '~components/common/detail-text'
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
      <DetailText small>
        <Snippet slug="ltc-top-notes" />
      </DetailText>
      <Container centered>
        <h2>Our Analysis &amp; Updates</h2>
        {data.allContentfulBlogPost.nodes.map(post => (
          <BlogItem post={post} extraMargin hideReadLink />
        ))}
        <LongContent>
          <Snippet slug="ltc-1" />
        </LongContent>
      </Container>
      <TableauChart
        id="ltc-1"
        height={520}
        mobileHeight={450}
        viewUrl="https://public.tableau.com/views/LTCDataObservations/web_FigMap?:language=en&:display_count=y&:origin=viz_share_link"
        viewUrlMobile="https://public.tableau.com/views/LTCDataObservations/mob_FigMap?:language=en&:display_count=y&:origin=viz_share_link"
      />
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
