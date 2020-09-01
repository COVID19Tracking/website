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
            <FormatNumber number={data.covidLtcWebsite.facilitiesCumulative} />
          }
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
    </Container>
    <Container centered>
      <LongContent>
        <h2>Deaths in Long-Term Care Facilities by Region</h2>
      </LongContent>
    </Container>
    <TableauChart
      id="ltc-1"
      height={525}
      mobileHeight={450}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/deathsbydate?:language=en&:display_count=y&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/deathsbydate?:language=en&:display_count=y&:origin=viz_share_link"
    />
    <Container centered>
      <LongContent>
        <DetailText small>
          <ContentfulContent
            id={data.timechartNotes.contentful_id}
            content={
              data.timechartNotes.childContentfulSnippetContentTextNode
                .childMarkdownRemark.html
            }
          />
        </DetailText>
        <ContentfulContent
          id={data.contentDefinitions.contentful_id}
          content={
            data.contentDefinitions.childContentfulSnippetContentTextNode
              .childMarkdownRemark.html
          }
        />
      </LongContent>
    </Container>
    <Container centered>
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
    covidLtcWebsite {
      facilitiesCumulative
      deathsCumulative
      casesCumulative
    }
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
    contentDefinitions: contentfulSnippet(slug: { eq: "ltc-definitions" }) {
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
    timechartNotes: contentfulSnippet(slug: { eq: "ltc-timechart-notes" }) {
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
