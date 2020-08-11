import React from 'react'
import { graphql } from 'gatsby'
import marked from 'marked'
import Container from '~components/common/container'
import LongContent from '~components/common/long-content'
import ContentfulContent from '~components/common/contentful-content'
import TableauChart from '~components/charts/tableau'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import DetailText from '~components/common/detail-text'
import DownloadLinks from '~components/pages/data/ltc/download-links'
import Layout from '~components/layout'
import Paragraph from '~components/common/landing-page/paragraph'

export default ({ data }) => (
  <Layout title="The Long-Term Care COVID Tracker" path="/data/longtermcare">
    <Paragraph narrow>
      <span
        dangerouslySetInnerHTML={{
          __html: marked.inlineLexer(data.lede.content.content, []),
        }}
      />
    </Paragraph>
    <h2>Cumulative</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <Total label="Total cases" number={<FormatNumber number={345983} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Total deaths" number={<FormatNumber number={65315} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total
          label="Total Number of Facilities Affected"
          number={<FormatNumber number={12824} />}
        />
      </Col>
    </Row>

    <h2>Active Outbreaks</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <Total label="Total cases" number={<FormatNumber number={101086} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Total deaths" number={<FormatNumber number={10213} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total
          label="Total Number of Facilities Affected"
          number={<FormatNumber number={5954} />}
        />
      </Col>
    </Row>
    <DetailText small>
      <ContentfulContent
        id={data.noteTopLine.contentful_id}
        content={
          data.noteTopLine.childContentfulSnippetContentTextNode
            .childMarkdownRemark.html
        }
      />
    </DetailText>
    <DownloadLinks />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.content1.contentful_id}
          content={
            data.content1.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
    <TableauChart
      id="ltc-1"
      height={520}
      mobileHeight={450}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
    />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.content2.contentful_id}
          content={
            data.content2.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
      <DetailText small>
        <ContentfulContent
          id={data.noteTable.contentful_id}
          content={
            data.noteTable.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </DetailText>
    </Container>
    <TableauChart
      id="ltc-2"
      height={1300}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
    />
    <Container centered>
      <LongContent>
        <ContentfulContent
          id={data.contentThanks.contentful_id}
          content={
            data.contentThanks.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    lede: contentfulSnippet(slug: { eq: "ltc-lede" }) {
      content {
        content
      }
    }
    content1: contentfulSnippet(slug: { eq: "ltc-1" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    content2: contentfulSnippet(slug: { eq: "ltc-2" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    contentThanks: contentfulSnippet(slug: { eq: "ltc-thanks" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    noteTopLine: contentfulSnippet(slug: { eq: "ltc-top-notes" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    noteTable: contentfulSnippet(slug: { eq: "ltc-table-notes" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
